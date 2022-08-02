import { Component, OnInit, OnDestroy, ViewChild, Input, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, Subject, combineLatest, map } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.scss']
})
export class MySkillsComponent implements OnInit, OnDestroy, AfterViewInit {

  //Initialize Variables
  //---------------------

  @Input() dataSource;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  //Page View State (Default is "Datatable for Sorting")
  viewState = 1;

  //Form Mode State (Add vs. Edit Mode)
  formMode = '';

  //Container to hold a list of items
  items: object;

  //Container to hold a single item
  item: Observable<any>;

  //Container to hold Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Container for Strongly typed Model.
  model = new UserSkill();
  catitem = new CatItem();
  catmodel = new CatalogState();
  globals = new Global();

  //Container for Strongly typed From Date Info.
  formDates = new FormDates();

  //Container to hold Current Active Item Key
  currentkey = '';

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

  //Rating Customizations
  ratingtype = 0;
  ratingsteps;

  //Table Settings
  displayedColumns: string[] = ['name', 'rating', 'delete', 'edit'];

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  //Constructor
  //---------------------
  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public db: AngularFireDatabase
  ) { }


  // @ViewChild(MatSort) sort: MatSort;

  // @ViewChild(MatSort) set MatSort(sort: MatSort) {
  //   this.dataSource.sort = this.sort;
  // }


  //Functions
  //---------------------

  //Function to Handle the Back Arrow
  goback(): void {
    switch (this.selectedIndex) {
      case 1: {
        this.tabTitle = 'Area';
        this.selectedIndex = 0;
        this.catmodel = new CatalogState();
        break;
      }
      case 2: {
        this.tabTitle = 'Category';
        this.selectedIndex = 1;
        this.catmodel.currentCategory = '';
        this.catmodel.currentCategoryName = '';
        this.catmodel.currentSkill = '';
        this.catmodel.currentSkillName = '';
        break;
      }
    }
  }

  //Function - Unique value of name for search/duplicates
  onConvertName(name: string): string {
    //trim leading and trailing spaces
    const trimname: string = name.trim();

    //replace spaces and multiple spaces with dash
    const dashname: string = trimname.replace(/\s+/g, '-');

    //covert to lowercase
    const value: string = dashname.toLowerCase();

    return value;

  }

  //Function - Search through skills for filtered querytext
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

            const results = searchskill.concat(searchuser);
            this.searchresults = results.concat(searchemail);

          });

        });

      });

    }

  }

  //Function - Call when an area is selected
  onAreaSelect(area): void {

    const areaId = area.key;

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
    );

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

    //Set the catalog state
    this.catmodel.currentArea = areaId;
    this.catmodel.currentAreaName = area.payload.val().name;

  }

  //Function - Call when a category is selected
  onCategorySelect(category): void {

    const categoryId = category.key;

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
    );

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
          this.skills = res.filter(skill => (skill.payload.val().name !== '' && skill.payload.val().name !== null) || (skill.payload.val().ratingsteps !== 5));
        });

    //Set the tab title
    this.tabTitle = 'Skill';

    //Set the tab to skills
    this.selectedIndex = 2;

    //Set the catalog state
    this.catmodel.currentCategory = categoryId;
    this.catmodel.currentCategoryName = ' > ' + category.payload.val().name;
  }

  //Function - Call when a skill is selected
  selectSkill(skill): void {

    const skillId = skill.key;

    this.catmodel.currentSkill = skill.key;
    this.model.key = skill.key;
    this.model.name = skill.payload.val().name;

    if (this.globals.rating === true) {
      this.ratingsteps = skill.payload.val().ratingsteps ?? this.globals.ratingsteps;
    } else {
      this.ratingsteps = skill.payload.val().ratingsteps ?? 5;
    }

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'add';

    //Set the catalog state
    this.catmodel.currentSkill = skillId;
    this.catmodel.currentSkillName = ' > ' + skill.payload.val().name;

  }


  //Function - Add Custom item to Catalog
  onAddCustom(form: NgForm): void {

    let type: string;

    //Switch catalog path based on item type
    if (this.tabTitle.toLowerCase() === 'category') {
      type = 'categories';
    } else {
      type = this.tabTitle.toLowerCase() + 's';
    }

    //Define and call Promise to add Item with hierachial attributes
    if (this.tabTitle.toLowerCase() === 'area') {

      //Cast model to variable for formReset
      const mname: string = this.catitem.name;
      const mdescription: string = this.catitem.description;
      const mvalue: string = this.onConvertName(this.catitem.name);
      const mdatenow = Math.floor(Date.now());

      //Define Promise
      const promiseAddItem = this.db.list('/customs/' + type).push({ name: mname, value: mvalue, description: mdescription, customtype: 'new', created: mdatenow, modified: mdatenow, uid: this.fbuser.id });

      //Call Promise
      promiseAddItem
        .then((res) => { this.viewState = 4, this.catitem = new CatItem(); })
        .catch(err => console.log(err, 'Error Submitting Item!'));

    } else if (this.tabTitle.toLowerCase() === 'category') {

      //Cast model to variable for formReset
      const mname: string = this.catitem.name;
      const mdescription: string = this.catitem.description;
      const mvalue: string = this.onConvertName(this.catitem.name);
      const marea: string = this.catmodel.currentArea;
      const mdatenow = Math.floor(Date.now());

      //Define Promise
      const promiseAddItem = this.db.list('/customs/' + type).push({ area: marea, name: mname, value: mvalue, description: mdescription, customtype: 'new', created: mdatenow, modified: mdatenow, uid: this.fbuser.id });

      //Call Promise
      promiseAddItem
        .then((res) => { this.viewState = 4, this.catitem = new CatItem(); })
        .catch(err => console.log(err, 'Error Submitting Item!'));

    } else { //this is a skill

      //Cast model to variable for formReset
      const mname: string = this.catitem.name;
      const mdescription: string = this.catitem.description;
      const mvalue: string = this.onConvertName(this.catitem.name);
      const mcategory: string = this.catmodel.currentCategory;
      const mdatenow = Math.floor(Date.now());
      let mratingsteps: number;

      if (this.globals.rating == true) {
        mratingsteps = this.globals.ratingsteps;
      } else {
        mratingsteps = 5;
      }

      //Define Promise
      const promiseAddItem = this.db.list('/customs/' + type).push({ category: mcategory, name: mname, value: mvalue, description: mdescription, ratingsteps: mratingsteps, customtype: 'new', created: mdatenow, modified: mdatenow, uid: this.fbuser.id });

      //Call Promise
      promiseAddItem
        .then((res) => { this.viewState = 4, this.catitem = new CatItem(); })
        .catch(err => console.log(err, 'Error Submitting Item!'));

    }

  }


  //Function - Add New Item to DB
  onAdd(): void {

    //Add the User ID to the Model
    this.model.uid = this.fbuser.id;

    //Begin Database Calls to add the New Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const addUserItem = this.db.list('/users/' + this.fbuser.id + '/skills').push(this.model).then((responseObject) => {



      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const addItem = this.db.list('/skills/').set(responseObject.key, this.model).then((responseObject) => {


        //Increment Count
        this.db.object('/counts/' + this.fbuser.id + '/skills').query.ref.transaction((counts) => {

          //Reset the Models back to Zero (Which also Resets the Form)
          this.model = new UserSkill();
          this.formDates = new FormDates();

          //Set the Counts
          if (counts === null) {
            return counts = 1;
          } else {
            return counts + 1;
          }

        });

      })
        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Add Item to Item Node Failed!'));

    })

      //Error Handling
      .catch(errorObject => console.log(errorObject, 'Add Item to User Node Failed!'));

  }


  //Function - Update Item in DB
  onEdit(key): void {

    //Begin Database Calls to Update the Existing Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const editUserItem = this.db.object('/users/' + this.fbuser.id + '/skills/' + key + '/').update(this.model).then((responseObject) => {

      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const editItem = this.db.object('/skills/' + key + '/').update(this.model).then((responseObject) => {

        //Reset the Models back to Zero (Which also Resets the Form)
        this.model = new UserSkill();
        this.formDates = new FormDates();
        this.currentkey = '';

      })
        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Add Item to Item Node Failed!'));

    })

      //Error Handling
      .catch(errorObject => console.log(errorObject, 'Add Item to User Node Failed!'));


  }


  onEditCustom(key: string): void {

    console.log(key);

    //Cast model to variable for formReset
    const mname: string = this.catitem.name;
    const mdescription: string = this.catitem.description;
    const mvalue: string = this.onConvertName(this.catitem.name);
    const mdatenow = Math.floor(Date.now());

    //Define and call Promise to add Item
    if (this.tabTitle.toLowerCase() === 'area') {

      this.db.object('/skillcatalog/areas/' + key).query.ref.transaction((ref) => {
        if (ref === null) {

          this.db.object('/customs/areas/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, modified: mdatenow, uid: this.fbuser.id });

          //Reset the Models back to Zero (Which also Resets the Form)
          this.catitem = new CatItem();
          //Set the View State
          this.viewState = 4;

        } else {

          this.db.object('/customs/areas/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, customtype: 'rename', modified: mdatenow, uid: this.fbuser.id });

          //Reset the Models back to Zero (Which also Resets the Form)
          this.catitem = new CatItem();
          //Set the View State
          this.viewState = 4;

        }
      });

    }
    else if (this.tabTitle.toLowerCase() === 'category') {

      const marea: string = this.catitem.area;

      this.db.object('/skillcatalog/categories/' + key).query.ref.transaction((ref) => {
        if (ref === null) {

          this.db.object('/customs/categories/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, area: marea, modified: mdatenow, uid: this.fbuser.id });

          //Reset the Models back to Zero (Which also Resets the Form)
          this.catitem = new CatItem();
          //Set the View State
          this.viewState = 4;

        } else {

          this.db.object('/customs/categories/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, area: marea, customtype: 'rename', modified: mdatenow, uid: this.fbuser.id });

          //Reset the Models back to Zero (Which also Resets the Form)
          this.catitem = new CatItem();
          //Set the View State
          this.viewState = 4;
        }
      });

    }
    else { //this is a skill

      const mratingsteps: number = this.catitem.ratingsteps;
      const mcategory: string = this.catitem.category;

      this.db.object('/skillcatalog/skills/' + key).query.ref.transaction((ref) => {
        if (ref === null || mratingsteps !== this.globals.ratingsteps) {

          this.db.object('/customs/skills/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, category: mcategory, ratingsteps: mratingsteps, modified: mdatenow, uid: this.fbuser.id });

          //Reset the Models back to Zero (Which also Resets the Form)
          this.catitem = new CatItem();
          //Set the View State
          this.viewState = 4;

        } else {

          this.db.object('/customs/skills/' + key)
            .update({ name: mname, description: mdescription, value: mvalue, category: mcategory, ratingsteps: mratingsteps, customtype: 'rename', modified: mdatenow, uid: this.fbuser.id });

          //Reset the Models back to Zero (Which also Resets the Form)
          this.catitem = new CatItem();
          //Set the View State
          this.viewState = 4;
        }
      });

    }

  }


  //Function - Delete Item in DB
  onDelete(key): void {

    //Make sure empty key isn't passed to wipe database
    if (key.length > 5) {

      console.log('deleting')
      //Container for Strongly //Delete Item from the Item Node.
      this.db.object('/skills/' + key).remove().then((responseObject) => {


        //Delete Item from the User Node.
        this.db.object('/users/' + this.fbuser.id + '/skills/' + key).remove().then((responseObject) => {


          //Decrement Count
          this.db.object('/counts/' + this.fbuser.id + '/skills').query.ref.transaction((counts) => {
            if (counts === null || counts <= 0) {

              return counts = 0;
            } else {
              return counts - 1;
            }
          });

        }
        )

          //Error Handling
          .catch(errorObject => console.log(errorObject, 'Remove Item from the User Node Failed!'));

      }
      )

        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Remove Item from the Item Node Failed!'));

    }

  }

  //Function - Delete Custom Catalog Item in DB
  onDeleteCustom(key): void {

    //Make sure empty key isn't passed to wipe database
    if (key.length > 5) {

      let type: string;

      //Switch catalog path based on item type
      if (this.tabTitle.toLowerCase() === 'category') {
        type = 'categories';
      } else {
        type = this.tabTitle.toLowerCase() + 's';
      }

      this.db.object('/customs/' + type + '/' + key).query.ref.transaction((ref) => {
        if (ref !== null) {
          this.db.object('/customs/' + type + '/' + key).remove();
        }
        //Reset the Models back to Zero (Which also Resets the Form)
        this.catitem = new CatItem();
        //Set the View State
        this.viewState = 4;
      });

    }

  }

  //Function - Cancel the Add or Edit Form
  onCancelForm(form: NgForm): void {
    this.model = new UserSkill();
    this.formDates = new FormDates();
    this.viewState = 1;
    this.ngAfterViewInit();

  }

  //Function - Cancel the Add Catalog/Search
  onCancelAdd(): void {
    this.model = new UserSkill();
    this.formDates = new FormDates();
    this.viewState = 1;
    this.ngAfterViewInit();

  }

  //Function - Show the Add Form
  onShowAddForm(): void {

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'add';
  }

  //Function - Show the Custom Add Form
  onShowCustomAddForm(): void {

    //Set the View State
    this.viewState = 6;

    //Set the Form Mode
    this.formMode = 'add';
  }

  //Function - Show the Edit Form
  onShowEditForm(key): void {

    //Set the current key
    this.currentkey = key;

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'edit';

    //Define Observable
    this.item = this.db.object('/users/' + this.fbuser.id + '/skills/' + key).valueChanges();

    //Subscribe to Observable
    this.item.subscribe((item) => {
      this.model = new UserSkill(key, item.name, item.rating, item.created, item.modified, item.user, item.ratingsteps);
    });


  }

  //Function - Show the Custom Edit Form
  onShowCustomEditForm(obj): void {

    //Set Key from Object
    const key: string = obj.key;

    //Set the current key
    this.currentkey = key;

    //Set the View State
    this.viewState = 6;

    //Set the Form Mode
    this.formMode = 'edit';

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
        this.catitem = new CatItem(key, item.name, item.value, item.description);
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
        this.catitem = new CatItem(key, item.name, item.value, item.description, item.area);
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
        this.catitem = new CatItem(key, item.name, item.value, item.description, null, item.category, item.ratingsteps);

      });

    }

  }


  //Function - Show the Delete Conf.
  onShowDelete(key): void {

    //Formbuilder for Dialog Popup
    const dialogconfigForm = this._formBuilder.group({
      title: 'Remove Item',
      message: 'Are you sure you want to remove this item permanently? <span class="font-medium">This action cannot be undone!</span>',
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

    //Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(dialogconfigForm.value);

    //Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        //Call Actual Delete
        this.onDelete(key);
      }
    });
  }

  //Function - Show the Delete Conf. for Custom Catalog Items
  onShowDeleteCustom(key): void {

    //Formbuilder for Dialog Popup
    const dialogconfigForm = this._formBuilder.group({
      title: 'Remove Item',
      message: 'Are you sure you want to remove this item permanently? <span class="font-medium">This action cannot be undone!</span>',
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

    //Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(dialogconfigForm.value);

    //Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        //Call Actual Delete
        this.onDeleteCustom(key);

        //Set the View State
        this.viewState = 4;
      }
    });
  }


  //Function - Show Skill Catalog
  onShowCatalog(): void {

    //Set the View State
    this.viewState = 4;

  }


  //Function - Show Search Dialog
  onShowSearch(): void {

    //Set the View State
    this.viewState = 5;

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {


  }

  /**
   * On After View init
   */
  ngAfterViewInit() {

    //Populate Areas - Firebase List Object
    const masters = this.db.list('/skillcatalog/areas/', ref => ref
      .orderByChild('name'))
      .snapshotChanges();

    const customs = this.db.list('/customs/areas/', ref => ref
      .orderByChild('key'))
      .snapshotChanges();

    const merged = combineLatest<any[]>([customs, masters]).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
    );

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
    this.items = this.db.list('/users/' + this.fbuser.id + '/skills').snapshotChanges().subscribe(
      (results) => {

        //Put the results of the DB call into an object.
        this.items = results;

        //  this.dataSource = new MatTableDataSource(results);
        //  this.dataSource.sort = this.sort;

        const itemList = [];

        results.forEach(element => {

          let json = element.payload.toJSON();
          json["$key"] = element.key;
          itemList.push(json as UserSkill);

        });

        this.dataSource = new MatTableDataSource(itemList);
        this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;

        //Check if the results object is empty
        if (Object.keys(this.items).length === 0) {
          //It's empty, so set the view state to "No Data" mode.
          this.viewState = 2;
        }
        else {
          //It's not empty, so set the view state to "Show Data" mode.
          this.viewState = 1;

        };

      }
    );

    //Call the Firebase Database and get the global data.
    this.db.object('/globals/').valueChanges().subscribe(
      (results: object) => {

        this.globals = results;


        if (this.globals.rating === true) {
          this.model.ratingsteps = this.globals.ratingsteps;
        } else if (isNaN(Number(this.model.ratingsteps))) {
          this.model.ratingsteps = 5;
        }
      }
    );


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
    public created: object = {},
    public modified: object = {},
    public uid: string = '',
    public ratingsteps: number = null

  ) { }

}


// Empty Catalog Item class
export class CatItem {

  constructor(
    public key: string = '',
    public name: string = '',
    public value: string = '',
    public description: string = '',
    public area?,
    public category?,
    public ratingsteps?

  ) { }

}

// Empty CatalogState class
export class CatalogState {

  constructor(
    public currentArea?: string,
    public currentCategory?: string,
    public currentSkill?: string,
    public currentAreaName?: string,
    public currentCategoryName?: string,
    public currentSkillName?: string,

  ) { }

}

// Empty Form Date class - Handles the conversion from UTC to Epoch dates.
export class FormDates {
  constructor(
    public awardedonForm: Date = null,
    public expiresonForm: Date = null,
  ) { }
}

// Empty Global state
export class Global {

  constructor(
    public rating?,
    public ratingsteps?,
    public usercustom?,
    public usercustomall?,
    public whitelist?

  ) { }

}
