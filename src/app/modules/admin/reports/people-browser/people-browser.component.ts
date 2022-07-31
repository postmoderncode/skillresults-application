import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
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
    public db: AngularFireDatabase
  ) { }


  //Functions
  //---------------------

  //Function - Filter Results
  applyFilter(event: Event) {
    if (this.searchText !== "") {
      let searchValue = this.searchText.toLocaleLowerCase();
      this.itemsFiltered = this.items.filter(contact => {
        return contact.name.toLocaleLowerCase().match(searchValue) ||
          contact.email.toLocaleLowerCase().match(searchValue);
      });

    } else {
      this.ngOnInit();
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


