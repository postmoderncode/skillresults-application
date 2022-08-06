import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit, OnDestroy {

  //Initialize Varables
  //-------------------

  //Container for Strongly typed Model.
  model = new Global();

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Constructor
  //---------------------
  constructor(
    public db: AngularFireDatabase
  ) { }


  //Functions
  //---------------------

  onToggleRating($event): void {

    this.db.object('/globals/rating').query.ref.transaction((state) => {
      if ($event.checked === true) {
        return state = true;
      } else {
        return state = false;
      }
    });
  }

  onToggleUserCustom($event): void {

    this.db.object('/globals/usercustom').query.ref.transaction((state) => {
      if ($event.checked === true) {
        return state = true;
      } else {
        return state = false;
      }
    });
  }

  onToggleUserCustomAll($event): void {

    this.db.object('/globals/usercustomall').query.ref.transaction((state) => {
      if ($event.checked === true) {
        return state = true;
      } else {
        return state = false;
      }
    });
  }

  onToggleWhitelist($event): void {

    this.db.object('/globals/whitelist').query.ref.transaction((state) => {
      if ($event.checked === true) {
        return state = true;
      } else {
        return state = false;
      }
    });
  }

  onToggleHideSearch($event): void {

    this.db.object('/globals/hidesearch').query.ref.transaction((state) => {
      if ($event.checked === true) {
        return state = true;
      } else {
        return state = false;
      }
    });
  }

  onSaveRatingSteps(steps): void {

    this.db.object('/globals/ratingsteps').set(steps)

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //Call the Firebase Database and get the global data.
    this.db.object('/globals').valueChanges().subscribe(
      (results: object) => {
        this.model = results;
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

// Empty Global state
export class Global {

  constructor(
    public rating?,
    public ratingsteps?,
    public usercustom?,
    public usercustomall?,
    public whitelist?,
    public hidesearch?

  ) { }

}

