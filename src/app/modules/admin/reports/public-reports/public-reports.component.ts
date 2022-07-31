import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-public-reports',
  templateUrl: './public-reports.component.html',
  styleUrls: ['./public-reports.component.scss']
})
export class PublicReportsComponent implements OnInit, AfterViewInit, OnDestroy {

  //Initialize Varables
  //-------------------

  //Incoming reportid from route
  id;

  //Current User
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
