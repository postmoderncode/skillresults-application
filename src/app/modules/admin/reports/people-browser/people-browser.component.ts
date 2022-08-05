import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-people-browser',
  templateUrl: './people-browser.component.html',
  styleUrls: ['./people-browser.component.scss']
})
export class PeopleBrowserComponent implements OnInit, OnDestroy {


  //Initialize Varables
  //-------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Container to hold a list of items
  items;

  //Search Variables
  searchText;
  itemsFiltered;

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

  //Function - Filter Results
  applyFilter(event: Event) {
    if (this.searchText !== "") {
      const searchValue = this.searchText.toLocaleLowerCase();
      this.itemsFiltered = this.items.filter(contact => {
        return contact.name.toLocaleLowerCase().match(searchValue) ||
          contact.email.toLocaleLowerCase().match(searchValue);
      });

    } else {
      this.ngOnInit();
    }
  }

  //Function - Show the Delete Conf.
  onShowDelete(key): void {

    //Formbuilder for Dialog Popup
    const dialogconfigForm = this._formBuilder.group({
      title: 'Revoke Admin Access',
      message: 'Are you sure you want to remove admin access from this user?',
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
        this.onRevokeAdmin(key);
      }
    });
  }

  //Function - Grant User Admin
  onGrantAdmin(key: string): void {

    //Make sure empty key isn't passed
    if (key.length > 5) {

      //Call the 1st Firebase PromiseObject (To add Item to User Node)
      const editUser = this.db.object('/users/' + key + '/isadmin').set(true).then((responseObject) => {

        //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
        const editUserList = this.db.object('/userlist/' + key + '/isadmin').set(true).then((responseObject) => {

        })
          //Error Handling
          .catch(errorObject => console.log(errorObject, 'Add Item to Item Node Failed!'));

      })

        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Add Item to User Node Failed!'));

    }

  }


  //Function - Revoke User Admin
  onRevokeAdmin(key: string): void {

    //Make sure empty key isn't passed
    if (key.length > 5) {

      //Call the 1st Firebase PromiseObject (To add Item to User Node)
      const editUser = this.db.object('/users/' + key + '/isadmin').set(false).then((responseObject) => {

        //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
        const editUserList = this.db.object('/userlist/' + key + '/isadmin').set(false).then((responseObject) => {

        })
          //Error Handling
          .catch(errorObject => console.log(errorObject, 'Add Item to Item Node Failed!'));

      })

        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Add Item to User Node Failed!'));

    }

  }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this.db.list('/userlist').valueChanges().subscribe((response) => {
      this.items = response;
      this.itemsFiltered = response;
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


