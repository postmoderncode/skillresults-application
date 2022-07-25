import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss']
})
export class MyReportsComponent implements OnInit, OnDestroy {


  //Initialize Varables
  //-------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Container to hold a list of items
  items: object;

  //Search Variables
  searchresults: object;

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Constructor
  //---------------------
  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public db: AngularFireDatabase
  ) { }

  //Function - Search through skills for filtered querytext
  onSearch(queryText: string): void {


    //Only search if search term exists
    if (queryText.length > 1) {

      // //Searh Skills by Unique Value
      // this.qresults1 = this.db.list('/skillcatalog/skills/', ref => ref
      //   .orderByChild('value')
      //   .startAt(this.onConvertName(queryText))
      //   .endAt(this.onConvertName(queryText) + '\uf8ff')).snapshotChanges();

      // //Search User by Name
      // this.qresults2 = this.db.list('/users/', ref => ref
      //   .orderByChild('name')
      //   .startAt(queryText)
      //   .endAt(queryText + '\uf8ff')).snapshotChanges();

      // //Search User by Email
      // this.qresults3 = this.db.list('/users/', ref => ref
      //   .orderByChild('email')
      //   .startAt(queryText)
      //   .endAt(queryText + '\uf8ff')).snapshotChanges();

      // //Combine search results
      // this.qresults1.subscribe((searchskill) => {
      //   this.qresults2.subscribe((searchuser) => {
      //     this.qresults3.subscribe((searchemail) => {

      //       let results;

      //       results = searchskill.concat(searchuser);
      //       this.searchresults = results.concat(searchemail);

      //     });

      //   });

      // });

    }

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //Call the Firebase Database and get the initial data.
    this.db.list('/userlist').snapshotChanges().subscribe(
      (results: object) => {

        //Put the results of the DB call into an object.
        this.items = results;
        console.log(this.items);

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
