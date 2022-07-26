import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, Subject } from 'rxjs';


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
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public db: AngularFireDatabase
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {


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
export class Global {

  constructor(
    public ratingscale?,
    public usercustom?,
    public restrictdomain?,
    public whitelist?

  ) { }

}
