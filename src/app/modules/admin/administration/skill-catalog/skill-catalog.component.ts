import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, Subject, combineLatest, map } from 'rxjs';


@Component({
  selector: 'app-skill-catalog',
  templateUrl: './skill-catalog.component.html',
  styleUrls: ['./skill-catalog.component.scss']
})
export class SkillCatalogComponent implements OnInit, OnDestroy {

  //Initialize Varables
  //-------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Confirmation Dialog
  dialogconfigForm: FormGroup;

  //Empty Model
  model = new CatItem();
  catmodel = new CatalogState();

  //Firebase Observables
  listRef: AngularFireList<any>;
  item: Observable<any>;

  //Form Visibility Modifiers
  showadditem = false;
  showedititem = false;

  //Object to Hold All Areas.
  areas;

  //Object to Hold Current Category List.
  categories;

  //Object to Hold Current Skill List.
  skills;

  //General Component Variables
  selectedIndex = 0;
  tabTitle = 'Area';

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
        this.tabTitle = 'Area';
        this.selectedIndex = 0;
        this.catmodel.currentCategory = '';
        this.catmodel.currentSkill = '';
        break;
      }
      case 2: {
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
  selectSkill(skillId): void {

    this.catmodel.currentSkill = skillId;
  }

  onAdd(): void {

    let type: string;

    //Switch catalog path based on item type
    if (this.tabTitle.toLowerCase() === 'category') {
      type = 'categories';
    } else {
      type = this.tabTitle.toLowerCase() + 's';
    }

    //Set Firebase Path
    this.listRef = this.db.list('/customs/' + type);

    //Define and call Promise to add Item with hierachial attributes
    if (this.tabTitle.toLowerCase() === 'area') {

      //Cast model to variable for formReset
      const mname: string = this.model.name;
      const mdescription: string = this.model.description;
      const mvalue: string = this.onConvertName(this.model.name);
      const mdatenow = Math.floor(Date.now());

      //Define Promise
      const promiseAddItem = this.listRef.push({ name: mname, value: mvalue, description: mdescription, customtype: 'new', created: mdatenow, modified: mdatenow, user: this.fbuser.id });

      //Call Promise
      promiseAddItem
        .then(_ => this.showadditem = false)
        .catch(err => console.log(err, 'Error Submitting Item!'));

    } else if (this.tabTitle.toLowerCase() === 'category') {

      //Cast model to variable for formReset
      const mname: string = this.model.name;
      const mdescription: string = this.model.description;
      const mvalue: string = this.onConvertName(this.model.name);
      const marea: string = this.catmodel.currentArea;
      const mdatenow = Math.floor(Date.now());

      //Define Promise
      const promiseAddItem = this.listRef.push({ area: marea, name: mname, value: mvalue, description: mdescription, customtype: 'new', created: mdatenow, modified: mdatenow, user: this.fbuser.id });

      //Call Promise
      promiseAddItem
        .then(_ => this.showadditem = false)
        .catch(err => console.log(err, 'Error Submitting Item!'));

    } else { //this is a skill

      //Cast model to variable for formReset
      const mname: string = this.model.name;
      const mdescription: string = this.model.description;
      const mvalue: string = this.onConvertName(this.model.name);
      const mcategory: string = this.catmodel.currentCategory;
      const mdatenow = Math.floor(Date.now());

      //Define Promise
      const promiseAddItem = this.listRef.push({ category: mcategory, name: mname, value: mvalue, description: mdescription, customtype: 'new', created: mdatenow, modified: mdatenow, user: this.fbuser.id });

      //Call Promise
      promiseAddItem
        .then(_ => this.showadditem = false)
        .catch(err => console.log(err, 'Error Submitting Item!'));

    }

  }

  onEdit(key: string): void {

    //Cast model to variable for formReset
    const mname: string = this.model.name;
    const mdescription: string = this.model.description;
    const mvalue: string = this.onConvertName(this.model.name);
    const mdatenow = Math.floor(Date.now());

    //Define and call Promise to add Item
    if (this.tabTitle.toLowerCase() === 'area') {

      this.db.object('/skillcatalog/areas/' + key).query.ref.transaction((ref) => {
        if (ref === null) {

          this.db.object('/customs/areas/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, modified: mdatenow, user: this.fbuser.id });


        } else {

          this.db.object('/customs/areas/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, customtype: 'rename', modified: mdatenow, user: this.fbuser.id });

        }
      });

    }
    else if (this.tabTitle.toLowerCase() === 'category') {

      this.db.object('/skillcatalog/categories/' + key).query.ref.transaction((ref) => {
        if (ref === null) {

          this.db.object('/customs/categories/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, modified: mdatenow, user: this.fbuser.id });


        } else {

          this.db.object('/customs/categories/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, customtype: 'rename', modified: mdatenow, user: this.fbuser.id });

        }
      });

    }
    else { //this is a skill


      this.db.object('/skillcatalog/skills/' + key).query.ref.transaction((ref) => {
        if (ref === null) {

          this.db.object('/customs/skills/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, modified: mdatenow, user: this.fbuser.id });


        } else {

          this.db.object('/customs/skills/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, customtype: 'rename', modified: mdatenow, user: this.fbuser.id });

        }
      });

    }

    this.showedititem = false;

  }

  onDelete(key: string): void {

    console.log(key + ' deleted');

  }

  //Contextual Button based on tabTitle
  onShowAddForm(type: string): void {
    this.showedititem = false;
    this.showadditem = true;

  }

  onHideAddForm(): void {
    this.showadditem = false;

  }

  onShowEditForm(key: string, obj): void {

    this.showadditem = false;
    this.showedititem = true;

    //Define and call Promise to add Item
    if (this.tabTitle.toLowerCase() === 'area') {

      //Is this a new custom or a renamed master
      if (obj.customs[0]?.payload.val().customtype === 'new' || obj.customs[0]?.payload.val().customtype === 'rename') {
        //Define Observable
        this.item = this.db.object('/customs/areas/' + key).valueChanges();
      }
      else {
        //Define Observable
        this.item = this.db.object('/skillcatalog/areas/' + key).valueChanges();
      }

      //Subscribe to Observable
      this.item.subscribe((item) => {
        this.model = new CatItem(key, item.name, item.value, item.description);
      });

    }
    else if (this.tabTitle.toLowerCase() === 'category') {

      //Is this a new custom or a renamed master  
      if (obj.customs[0]?.payload.val().customtype === 'new' || obj.customs[0]?.payload.val().customtype === 'rename') {
        //Define Observable
        this.item = this.db.object('/customs/categories/' + key).valueChanges();
      }
      else {
        //Define Observable
        this.item = this.db.object('/skillcatalog/categories/' + key).valueChanges();
      }

      //Subscribe to Observable
      this.item.subscribe((item) => {
        this.model = new CatItem(key, item.name, item.value, item.description, item.area);
      });

    }
    else { //this is a skill

      //Is this a new custom or a renamed master
      if (obj.customs[0]?.payload.val().customtype === 'new' || obj.customs[0]?.payload.val().customtype === 'rename') {
        //Define Observable
        this.item = this.db.object('/customs/skills/' + key).valueChanges();
      }
      else {
        //Define Observable
        this.item = this.db.object('/skillcatalog/skills/' + key).valueChanges();
      }

      //Subscribe to Observable
      this.item.subscribe((item) => {
        this.model = new CatItem(key, item.name, item.value, item.description, item.category);
      });

    }

  }

  onHideItem(key: string): void {

    console.log('This ' + this.tabTitle + ' is hidden: ' + key);

    //Write item to Custom skill tree
    let type: string;

    //Switch catalog path based on item type
    if (this.tabTitle.toLowerCase() === 'category') {
      type = 'categories';
    }
    else {
      type = this.tabTitle.toLowerCase() + 's';
    }

    //If Hidden Exists, Delete. Otherwise set Hidden 
    this.db.object('/customs/' + type + '/' + key + '/hidden')
      .query.ref.transaction((hidden) => {
        if (hidden === true) {
          this.db.object('/customs/' + type + '/' + key + '/hidden').remove();
        } else {
          return hidden = true;
        }
      });

  }

  onHideEditForm(): void {
    this.showedititem = false;
    this.model = new CatItem();

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

// Empty Catalog Item class
export class CatItem {

  constructor(
    public key: string = '',
    public name: string = '',
    public value: string = '',
    public description: string = '',
    public area?,
    public category?,

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
