import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-skill-catalog',
  templateUrl: './skill-catalog.component.html',
  styleUrls: ['./skill-catalog.component.scss']
})
export class SkillCatalogComponent implements OnInit {

  //Initialize Varables
  //-------------------

  //Scroll element
  @ViewChild(CdkScrollable) cdkScrollable: CdkScrollable;

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Confirmation Dialog
  dialogconfigForm: FormGroup;

  //Empty Model
  model = new Skill();
  catmodel = new CatalogState();

  //Firebase Observables
  listRef: AngularFireList<any>;
  item: Observable<any>;

  //Form Visibility Modifiers
  showadditem = false;
  showedititem = false;

  //Object to Hold All Areas.
  areas: Observable<any>;

  //Object to Hold Current Category List.
  categories: object;

  //Object to Hold Current Skill List.
  skills: object;

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
    this.db.list('/skillcatalog/categories/', ref => ref
      .orderByChild('area')
      .equalTo(areaId))
      .snapshotChanges().subscribe(
        (results: object) => { this.categories = results; }
      );

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
    this.db.list('/skillcatalog/skills/', ref => ref
      .orderByChild('category')
      .equalTo(categoryId))
      .snapshotChanges().subscribe(
        (results: any[]) => { this.skills = results; }
      );

    this.tabTitle = 'Skill';
    this.selectedIndex = 2;
    this.catmodel.currentCategory = categoryId;
  }

  //Function to call when a category is selected
  selectSkill(skillId): void {
    this.catmodel.currentSkill = skillId;
  }

  onAdd(): void {

    let type: string;

    //Switch catalog path based on item type
    if (this.tabTitle.toLowerCase() === 'category') {
      type = 'categories';
    }
    else {
      type = this.tabTitle.toLowerCase() + 's';
    }

    //Set Firebase Path
    this.listRef = this.db.list('/skillcatalog/' + type);

    //Define and call Promise to add Item with hierachial attributes
    if (this.tabTitle.toLowerCase() === 'area') {

      //Cast model to variable for formReset
      const mname: string = this.model.name;
      const mdescription: string = this.model.description;
      const mvalue: string = this.onConvertName(this.model.name);

      //Define Promise
      const promiseAddItem = this.listRef.push({ name: mname, value: mvalue, description: mdescription });

      //Call Promise
      promiseAddItem
        .then(_ => this.showadditem = false)
        .catch(err => console.log(err, 'Error Submitting Item!'));

    }
    else if (this.tabTitle.toLowerCase() === 'category') {

      //Cast model to variable for formReset
      const mname: string = this.model.name;
      const mdescription: string = this.model.description;
      const mvalue: string = this.onConvertName(this.model.name);
      const marea: string = this.catmodel.currentArea;

      //Define Promise
      const promiseAddItem = this.listRef.push({ area: marea, name: mname, value: mvalue, description: mdescription });

      //Call Promise
      promiseAddItem
        .then(_ => this.showadditem = false)
        .catch(err => console.log(err, 'Error Submitting Item!'));


    }
    else { //this is a skill

      //Cast model to variable for formReset
      const mname: string = this.model.name;
      const mdescription: string = this.model.description;
      const mvalue: string = this.onConvertName(this.model.name);
      const mcategory: string = this.catmodel.currentCategory;

      //Define Promise
      const promiseAddItem = this.listRef.push({ category: mcategory, name: mname, value: mvalue, description: mdescription });

      //Call Promise
      promiseAddItem
        .then(_ => this.showadditem = false)
        .catch(err => console.log(err, 'Error Submitting Item!'));

    }

    this.cdkScrollable.scrollTo({ top: 0 });

  }

  onEdit(key): void {

    // //Cast model to variable for formReset
    // const mname: string = this.model.name;
    // const mdescription: string = this.model.description;
    // const mdatenow = Math.floor(Date.now());

    // this.db.object('/users/' + this.fbuser.id + '/talents' + '/' + key)
    //   .update({ name: mname, description: mdescription, created: mdatenow, modified: mdatenow, user: this.fbuser.id });
    // this.db.object('/talents/' + this.fbuser.id + '/' + key)
    //   .update({ name: mname, description: mdescription, created: mdatenow, modified: mdatenow, user: this.fbuser.id });
    // this.showedititem = false;

    this.cdkScrollable.scrollTo({ top: 0 });
    console.log(key + ' edited');
  }

  onDelete(key): void {

    //this.db.object('/skillcatalog/' + this.fbuser.id + '/talents/' + key).remove();

    console.log(key + ' deleted');

  }

  //Contextual Button based on tabTitle
  onShowAddForm(type: string): void {
    this.showedititem = false;
    this.showadditem = true;
    this.cdkScrollable.scrollTo({ top: 0 });
  }

  onHideAddForm(): void {
    this.showadditem = false;
    this.cdkScrollable.scrollTo({ top: 0 });
  }

  onShowEditForm(key): void {

    this.showadditem = false;
    this.showedititem = true;
    this.cdkScrollable.scrollTo({ top: 0 });

    // //Define Observable
    // this.item = this.db.object('/users/' + this.fbuser.id + '/talents/' + key).valueChanges();

    // //Subscribe to Observable
    // this.item.subscribe((item) => {
    //   this.model = new Talent(key, item.name, item.description, item.created, item.modified, item.user);
    // });

    console.log(key + 'has been selected to edit');
  }

  onHideEditForm(): void {
    this.showedititem = false;
    this.model = new Skill();
    this.cdkScrollable.scrollTo({ top: 0 });
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

  ngOnInit(): void {

    //Populate Areas - Firebase List Object
    this.areas = this.db.list('/skillcatalog/areas/', ref => ref
      .orderByChild('name'))
      .snapshotChanges();

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

}

// Empty Skill class
export class Skill {

  constructor(
    public key: string = '',
    public name: string = '',
    public description: string = '',
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



