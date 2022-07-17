import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit, OnDestroy {

  //Initialize Varables
  //-------------------

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Firebase Observables
  user;

  //Firebase Observables
  counts;

  //Total Wishlists
  wishlistscount;



  //Constructor
  //---------------------
  constructor(
    public db: AngularFireDatabase
  ) { }


  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this.db.object('/users/' + this.fbuser.id)
      .valueChanges().subscribe(
        (results: any[]) => {
          console.log(results);
          this.user = results;
        }

      );

    this.wishlistscount = 0;

    this.db.object('/counts/' + this.fbuser.id)
      .valueChanges().subscribe(
        (results: any[]) => {
          this.counts = results;
          this.wishlistscount = (this.counts.wishlists?.awards ?? 0) +
            (this.counts?.wishlists?.certifications ?? 0) +
            (this.counts?.wishlists?.degrees ?? 0) +
            (this.counts?.wishlists?.skills ?? 0) +
            (this.counts?.wishlists?.training ?? 0);

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
