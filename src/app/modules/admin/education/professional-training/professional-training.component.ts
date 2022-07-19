import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, Subject } from 'rxjs';
import { serverTimestamp } from '@angular/fire/database';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-professional-training',
  templateUrl: './professional-training.component.html',
  styleUrls: ['./professional-training.component.scss']
})

export class ProfessionalTrainingComponent implements OnInit, OnDestroy {

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
  model = new Training();

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

  //Fuction - Show the Add Form
  onShowAddForm(): void {

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'add';
  }

  //Fuction - Show the Edit Form
  onShowEditForm(key): void {

    //Set the current key
    this.currentkey = key;

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'edit';

    //Define Observable
    this.item = this.db.object('/users/' + this.fbuser.id + '/training/' + key).valueChanges();

    //Subscribe to Observable
    this.item.subscribe((response) => {

      //Populate the Item Model with the response date from the DB.
      this.model = response;

      //Populate the "Form Dates Model" with the Unix Epoch Dates (Converted to GMT)
      if (this.model.awardedon != null) {
        this.formDates.awardedonForm = new Date(this.model.awardedon);
      };

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

    //If the Date "Awarded On" on the Form is not Null, then add it to the item model (in Unix Epoch Time).
    if (this.formDates.awardedonForm != null) {
      this.model.awardedon = this.formDates.awardedonForm.valueOf();
    }

    //Add Server Side Timestamp to the Model
    this.model.created = serverTimestamp();
    this.model.modified = serverTimestamp();

    //Begin Database Calls to add the New Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const addUserItem = this.db.list('/users/' + this.fbuser.id + '/training').push(this.model).then((responseObject) => {

      //Log Success
      console.log('Item added to the User Node');

      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const addItem = this.db.list('/training/').set(responseObject.key, this.model).then((responseObject) => {

        console.log('Item added to the Item Node');

        //Increment Count
        this.db.object('/counts/' + this.fbuser.id + '/training').query.ref.transaction((counts) => {

          //Log the Counter Success
          console.log('Counter Updated Succesfuly');

          //Reset the Models back to Zero (Which also Resets the Form)
          this.model = new Training();
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

    //If the Date "Awarded On" on the Form is not Null, then add it to the item model (in Unix Epoch Time).
    if (this.formDates.awardedonForm != null) {
      this.model.awardedon = this.formDates.awardedonForm.valueOf();
    }

    //Add Server Side Timestamp to the Model

    this.model.modified = serverTimestamp();

    //Begin Database Calls to Update the Existing Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const editUserItem = this.db.object('/users/' + this.fbuser.id + '/training/' + key + '/').update(this.model).then((responseObject) => {

      //Log Success
      console.log('Item updated in the User Node');

      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const editItem = this.db.object('/training/' + key + '/').update(this.model).then((responseObject) => {

        console.log('Item updated in the Item Node');

        //Reset the Models back to Zero (Which also Resets the Form)
        this.model = new Training();
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

    //Container for Strongly //Delete Item from the Item Node.
    this.db.object('/training/' + key).remove().then((responseObject) => {

      //Log Sucess
      console.log('Remove Item from the Item Node Complete');

      //Delete Item from the User Node.
      this.db.object('/users/' + this.fbuser.id + '/training/' + key).remove().then((responseObject) => {

        //Log Sucess
        console.log('Remove Item from the User Node Complete');

        //Decrement Count
        this.db.object('/counts/' + this.fbuser.id + '/training').query.ref.transaction((counts) => {
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

    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });

  }

  //Function - Cancel the Add or Edit Form
  onCancelForm(form: NgForm): void {
    this.model = new Training();
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
    this.db.list('/users/' + this.fbuser.id + '/training').snapshotChanges().subscribe(
      (results: object) => {

        //Put the results of the DB call into an object.
        this.items = results;

        console.log(this.items);

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

// Empty Training class
export class Training {

  constructor(
    public key: string = '',
    public name: string = '',
    public description: string = '',
    public created: object = {},
    public modified: object = {},
    public uid: string = '',
    public awardedby: string = '',
    public awardedon: number = null,

  ) { }

}

// Empty Form Date class - Handles the conversion from UTC to Epoch dates.
export class FormDates {
  constructor(
    public awardedonForm: Date = null,
    public expiresonForm: Date = null,
  ) { }
}
