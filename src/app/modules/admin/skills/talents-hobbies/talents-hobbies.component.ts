import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, Subject } from 'rxjs';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-talents-hobbies',
  templateUrl: './talents-hobbies.component.html',
  styleUrls: ['./talents-hobbies.component.scss']
})

export class TalentsHobbiesComponent implements OnInit, OnDestroy {

  //Initialize Variables
  //---------------------

  //Scroll element
  @ViewChild(CdkScrollable) cdkScrollable: CdkScrollable;

  //Page View State (Default is "Loading..")
  viewState = 0;

  //Form Mode State (Add vs. Edit Mode)
  formMode = '';

  //Container to hold a list of items
  items: object;

  //Container to hold a single item
  item: Observable<any>;

  //Container to hold Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Container for Strongly typed Model.
  model = new Talent();

  //Container for Strongly typed From Date Info.
  formDates = new FormDates();

  //Container to hold Current Active Item Key
  currentkey = '';

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Constructor
  //---------------------
  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public db: AngularFireDatabase
  ) { }

  //Functions
  //---------------------

  //Function - Show the Add Form
  onShowAddForm(): void {

    //Set the View State
    this.viewState = 3;

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
    this.item = this.db.object('/users/' + this.fbuser.id + '/talents/' + key).valueChanges();

    //Subscribe to Observable
    this.item.subscribe((response) => {

      //Populate the Item Model with the response date from the DB.
      this.model = response;

    });

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

  //Function - Add New Item to DB
  onAdd(): void {

    //Add the User ID to the Model
    this.model.uid = this.fbuser.id;

    //Begin Database Calls to add the New Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const addUserItem = this.db.list('/users/' + this.fbuser.id + '/talents').push(this.model).then((responseObject) => {



      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const addItem = this.db.list('/talents/').set(responseObject.key, this.model).then((responseObject) => {


        //Increment Count
        this.db.object('/counts/' + this.fbuser.id + '/talents').query.ref.transaction((counts) => {

          //Reset the Models back to Zero (Which also Resets the Form)
          this.model = new Talent();
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

    //Scroll to Top
    this.cdkScrollable.scrollTo({ top: 0 });

  }

  //Function - Update Item in DB
  onEdit(key): void {

    //Begin Database Calls to Update the Existing Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const editUserItem = this.db.object('/users/' + this.fbuser.id + '/talents/' + key + '/').update(this.model).then((responseObject) => {

      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const editItem = this.db.object('/talents/' + key + '/').update(this.model).then((responseObject) => {

        //Reset the Models back to Zero (Which also Resets the Form)
        this.model = new Talent();
        this.formDates = new FormDates();
        this.currentkey = '';

      })
        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Add Item to Item Node Failed!'));

    })

      //Error Handling
      .catch(errorObject => console.log(errorObject, 'Add Item to User Node Failed!'));

    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });

  }

  //Function - Delete Item in DB
  onDelete(key): void {

    //Make sure empty key isn't passed to wipe database
    if (key.length > 5) {

      //Container for Strongly //Delete Item from the Item Node.
      this.db.object('/talents/' + key).remove().then((responseObject) => {


        //Delete Item from the User Node.
        this.db.object('/users/' + this.fbuser.id + '/talents/' + key).remove().then((responseObject) => {


          //Decrement Count
          this.db.object('/counts/' + this.fbuser.id + '/talents').query.ref.transaction((counts) => {
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

    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });

  }

  //Function - Cancel the Add or Edit Form
  onCancelForm(form: NgForm): void {
    this.model = new Talent();
    this.formDates = new FormDates();
    this.viewState = 1;
    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //Call the Firebase Database and get the initial data.
    this.db.list('/users/' + this.fbuser.id + '/talents').snapshotChanges().subscribe(
      (results: object) => {

        //Put the results of the DB call into an object.
        this.items = results;

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

// Empty Talent class
export class Talent {

  constructor(
    public name: string = '',
    public description: string = '',
    public created: object = {},
    public modified: object = {},
    public uid: string = '',

  ) { }

}

// Empty Form Date class - Handles the conversion from UTC to Epoch dates.
export class FormDates {
  constructor(
    public awardedonForm: Date = null,
    public expiresonForm: Date = null,
  ) { }
}
