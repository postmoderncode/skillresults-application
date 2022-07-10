import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, Subject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-wishlist-skills',
  templateUrl: './wishlist-skills.component.html',
  styleUrls: ['./wishlist-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WishlistSkillsComponent implements OnInit, OnDestroy {

  //Initialize Varables
  //-------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Confirmation Dialog
  dialogconfigForm: FormGroup;

  //Empty Model
  model = new UserSkill();
  catmodel = new CatalogState();

  //Firebase Observables
  listRef: AngularFireList<any>;
  item: Observable<any>;
  items: Observable<any[]>;

  //Form Visibility Modifiers
  showadditem = false;
  showedititem = false;
  showsearch = false;
  showcatalog = false;

  //Object to Hold All Areas.
  areas;

  //Object to Hold Current Category List.
  categories;

  //Object to Hold Current Skill List.
  skills;

  //General Component Variables
  selectedIndex = 0;
  tabTitle = 'Area';

  //Search Variables
  searchresults: object;
  qresults1;
  qresults2;
  qresults3;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public db: AngularFireDatabase
  ) { }

  //Function to Handle the Back Arrow
  goback(): void {
    switch (this.selectedIndex) {
      case 1: {
        console.log('goback 1');
        this.tabTitle = 'Area';
        this.selectedIndex = 0;
        this.catmodel.currentCategory = '';
        this.catmodel.currentSkill = '';
        break;
      }
      case 2: {
        console.log('goback 2');
        this.tabTitle = 'Category';
        this.selectedIndex = 1;
        this.catmodel.currentSkill = '';
        break;
      }
    }
  }

  //Function for unique value of name for search/duplicates
  onConvertName(name: string): string {
    //trim leading and trailing spaces
    const trimname: string = name.trim();

    //replace spaces and multiple spaces with dash
    const dashname: string = trimname.replace(/\s+/g, '-');

    //covert to lowercase
    const value: string = dashname.toLowerCase();

    return value;

  }

  //Function to search through skills for filtered querytext
  onSearch(queryText: string): void {


    //Only search if search term exists
    if (queryText.length > 1) {

      //Searh Skills by Unique Value
      this.qresults1 = this.db.list('/skillcatalog/skills/', ref => ref
        .orderByChild('value')
        .startAt(this.onConvertName(queryText))
        .endAt(this.onConvertName(queryText) + '\uf8ff')).snapshotChanges();

      //Search User by Name
      this.qresults2 = this.db.list('/users/', ref => ref
        .orderByChild('name')
        .startAt(queryText)
        .endAt(queryText + '\uf8ff')).snapshotChanges();

      //Search User by Email
      this.qresults3 = this.db.list('/users/', ref => ref
        .orderByChild('email')
        .startAt(queryText)
        .endAt(queryText + '\uf8ff')).snapshotChanges();

      //Combine search results
      this.qresults1.subscribe((searchskill) => {
        this.qresults2.subscribe((searchuser) => {
          this.qresults3.subscribe((searchemail) => {

            let results;

            results = searchskill.concat(searchuser);
            this.searchresults = results.concat(searchemail);

          });

        });

      });

    }

  }

  //Function to call when an area is selected
  onAreaSelect(areaId): void {

    //Populate Categories - Firebase List w/ Sort&Filter Query
    const masters = this.db.list('/skillcatalog/categories/', ref => ref
      .orderByChild('area')
      .equalTo(areaId))
      .snapshotChanges();

    const customs = this.db.list('/customs/categories/', ref => ref
      .orderByChild('area')
      .equalTo(areaId))
      .snapshotChanges();

    const merged = combineLatest<any[]>([customs, masters]).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
    )

    combineLatest(
      [merged, customs],
      (a, b) =>
        a.map((s) => ({
          ...s,
          customs: b.filter((a) => a.key === s.key),
        })
        ))
      .subscribe(
        (res) => {
          this.categories = res.filter(catagory => catagory.payload.val().name !== '' && catagory.payload.val().name !== null);
        });

    //Set the title
    this.tabTitle = 'Category';

    //Set the tab to categories
    this.selectedIndex = 1;

    this.catmodel.currentArea = areaId;

    console.log(this.tabTitle);

  }

  //Function to call when a category is selected
  onCategorySelect(categoryId): void {

    console.log(categoryId);

    //Populate Skills - Firebase List w/ Sort&Filter Query
    const masters = this.db.list('/skillcatalog/skills/', ref => ref
      .orderByChild('category')
      .equalTo(categoryId))
      .snapshotChanges();

    const customs = this.db.list('/customs/skills/', ref => ref
      .orderByChild('category')
      .equalTo(categoryId))
      .snapshotChanges();

    const merged = combineLatest<any[]>([customs, masters]).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
    )

    combineLatest(
      [merged, customs],
      (a, b) =>
        a.map((s) => ({
          ...s,
          customs: b.filter((a) => a.key === s.key),
        })
        ))
      .subscribe(
        (res) => {
          this.skills = res.filter(skill => skill.payload.val().name !== '' && skill.payload.val().name !== null);
        });

    this.tabTitle = 'Skill';
    this.selectedIndex = 2;
    this.catmodel.currentCategory = categoryId;
  }

  //Function to call when a skill is selected
  selectSkill(skillId, skillName): void {
    this.catmodel.currentSkill = skillId;
    this.model.key = skillId;
    this.model.name = skillName;
    this.showedititem = false;
    this.showadditem = true;
    this.showsearch = false;
    this.showcatalog = false;

  }

  onAdd(): void {


    this.listRef = this.db.list('/users/' + this.fbuser.id + '/wishlists/skills');

    //Cast model to variable for formReset
    const mkey: string = this.model.key;
    const mname: string = this.model.name;
    const mrating: number = this.model.rating;
    const mdatenow = Math.floor(Date.now());

    //Define Promise
    const promiseAddItem = this.listRef.push({ key: mkey, name: mname, rating: mrating, created: mdatenow, modified: mdatenow, user: this.fbuser.id });

    //Call Promise
    promiseAddItem
      .then(_ => this.db.object('/wishlists/skills/' + this.fbuser.id + '/' + _.key)
        .update({ key: mkey, name: mname, rating: mrating, created: mdatenow, modified: mdatenow, user: this.fbuser.id }))
      .then(_ => this.showadditem = false)
      .catch(err => console.log(err, 'Error Submitting Skill!'));

    //Increment Count
    this.db.object('/counts/' + this.fbuser.id + '/wishlists/skills').query.ref.transaction((likes) => {
      if (likes === null) {
        return likes = 1;
      } else {
        return likes + 1;
      }
    });

  }

  onEdit(key): void {

    //Cast model to variable for formReset
    const mrating: number = this.model.rating;
    const mdatenow = Math.floor(Date.now());

    this.db.object('/users/' + this.fbuser.id + '/wishlists/skills/' + key)
      .update({ rating: mrating, modified: mdatenow });
    this.db.object('/wishlists/skills/' + this.fbuser.id + '/' + key)
      .update({ rating: mrating, modified: mdatenow });
    this.showedititem = false;

  }

  onDelete(key): void {
    this.db.object('/users/' + this.fbuser.id + '/wishlists/skills/' + key).remove();
    this.db.object('/wishlists/skills/' + this.fbuser.id + '/' + key).remove();

    this.showedititem = false;
    this.showadditem = false;
    this.showsearch = false;
    this.showcatalog = false;

    //Decrement Count
    this.db.object('/counts/' + this.fbuser.id + '/wishlists/skills').query.ref.transaction((likes) => {
      if (likes === null) {
        return likes = 0;
      } else {
        return likes - 1;
      }
    });

  }

  //Contextual Button based on tabTitle
  onShowAddForm(): void {
    this.showedititem = false;
    this.showadditem = true;
    this.showsearch = false;
    this.showcatalog = false;

  }

  onHideAddForm(): void {
    this.showadditem = false;

  }

  onCancelAdd(): void {

    this.showedititem = false;
    this.showadditem = false;
    this.showsearch = false;
    this.showcatalog = false;

  }

  onShowEditForm(key): void {
    console.log('edit form shown');
    this.showadditem = false;
    this.showsearch = false;
    this.showcatalog = false;
    this.showedititem = true;


    //Define Observable
    this.item = this.db.object('/users/' + this.fbuser.id + '/wishlists/skills/' + key).valueChanges();

    //Subscribe to Observable
    this.item.subscribe((item) => {
      this.model = new UserSkill(key, item.name, item.rating, item.created, item.modified, item.user);
    });

    console.log(key + 'has been selected to edit');
  }

  onHideEditForm(): void {
    this.showedititem = false;
    this.model = new UserSkill();

  }

  onShowCatalog(): void {
    this.showadditem = false;
    this.showedititem = false;
    this.showsearch = false;
    this.showcatalog = true;

  }

  openConfirmationDialog(key): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.dialogconfigForm.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.onDelete(key);
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //Populate Areas - Firebase List Object
    const masters = this.db.list('/skillcatalog/areas/', ref => ref
      .orderByChild('name'))
      .snapshotChanges();

    const customs = this.db.list('/customs/areas/', ref => ref
      .orderByChild('key'))
      .snapshotChanges();

    const merged = combineLatest<any[]>([customs, masters]).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
    )

    combineLatest(
      [merged, customs],
      (a, b) =>
        a.map((s) => ({
          ...s,
          customs: b.filter((a) => a.key === s.key),
        })
        ))
      .subscribe(
        (res) => {
          this.areas = res.filter(area => area.payload.val().name !== '' && area.payload.val().name !== null);
        });

    //Populate User Skills - Firebase List Object
    this.items = this.db.list('/users/' + this.fbuser.id + '/wishlists/skills').snapshotChanges();


    //Formbuilder for Dialog Popup
    this.dialogconfigForm = this._formBuilder.group({
      title: 'Remove Item',
      message: 'Are you sure you want to remove this ' + this.tabTitle + ' permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Remove',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'Cancel'
        })
      }),
      dismissible: false
    });

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}

// -----------------------------------------------------------------------------------------------------
// @ Models
// -----------------------------------------------------------------------------------------------------

// Empty UserSkill class
export class UserSkill {

  constructor(
    public key: string = '',
    public name: string = '',
    public rating: number = 0,
    public created: string = '',
    public modified: string = '',
    public user: string = '',

  ) { }

}

// Empty CatalogState class
export class CatalogState {

  constructor(
    public currentArea?: string,
    public currentCategory?: string,
    public currentSkill?: string,

  ) { }

}
