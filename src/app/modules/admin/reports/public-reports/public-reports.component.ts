import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
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

  @Input() dataSource;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Container to hold a list of items
  items;

  //Search Variables
  searchText;
  itemsFiltered;

  //Table Settings
  displayedColumns: string[] = ['name', 'rating', 'uid'];

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Constructor
  //---------------------
  constructor(
    public db: AngularFireDatabase
  ) { }


  //Functions
  //---------------------

  //Function - Filter Table Datasource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {


  }
  /**
   * On After View init
   */
  ngAfterViewInit() {

    //Populate User Skills - Firebase List Object
    this.items = this.db.list('/skills').snapshotChanges().subscribe(
      (results) => {

        //Put the results of the DB call into an object.
        //this.items = results;

        const itemList = [];

        results.forEach(element => {

          let json = element.payload.toJSON();
          json["$key"] = element.key;
          itemList.push(json);

        });

        this.items = itemList;
        this.dataSource = new MatTableDataSource(itemList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

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
