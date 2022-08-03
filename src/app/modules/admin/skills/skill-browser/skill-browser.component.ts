import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-skill-browser',
  templateUrl: './skill-browser.component.html',
  styleUrls: ['./skill-browser.component.scss']
})
export class SkillBrowserComponent implements OnInit, OnDestroy, AfterViewInit {

  //Initialize Variables
  //---------------------

  //Scroll element
  @ViewChild(CdkScrollable) cdkScrollable: CdkScrollable;

  //Incoming userid from route
  id;

  //Form Mode State (Add vs. Edit Mode)
  formMode = '';

  //Container to hold a list of items
  items: object;

  //Container to hold a single item
  item;

  //Container to hold Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  //Constructor
  //---------------------
  constructor(
    public db: AngularFireDatabase,
    private _Activatedroute: ActivatedRoute
  ) { }


  //Functions
  //---------------------



  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this.id = this._Activatedroute.snapshot.paramMap.get('id');

    this.db.object('/skillcatalog/skills/' + this.id).query.ref.transaction((ref) => {
      if (ref !== null) {

        this.db.object('/skillcatalog/skills/' + this.id)
          .valueChanges().subscribe(
            (results: any[]) => {
              this.item = results;
            });


      } else {

        this.db.object('/customs/skills/' + this.id)
          .valueChanges().subscribe(
            (results: any[]) => {
              this.item = results;
            });

      }
    });

  }


  /**
   * On After View init
   */
  ngAfterViewInit(): void {

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
