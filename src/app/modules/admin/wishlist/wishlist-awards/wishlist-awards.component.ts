import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-wishlist-awards',
  templateUrl: './wishlist-awards.component.html',
  styleUrls: ['./wishlist-awards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistAwardsComponent implements OnInit, OnDestroy {

  //Initialize Variables
  //---------------------

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  //Constructor
  //---------------------

  constructor() { }

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
