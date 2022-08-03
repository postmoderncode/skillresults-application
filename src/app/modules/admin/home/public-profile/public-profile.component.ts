import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit, OnDestroy, AfterViewInit {

  //Initialize Varables
  //-------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Firebase Observables
  user;

  //Firebase Observables
  counts;

  //Incoming userid from route
  id;

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


  //Function - Prints Current Page
  printThisPage() {
    window.print();
  }

  //Function - Handles file download
  onDownload(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  //Function - Called from template to download user object
  onDownloadUser(): void {
    this.onDownload(JSON.stringify(this.user), this.fbuser.email + ".json", "text/plain");

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    if (this._Activatedroute.snapshot.paramMap.get('id') === 'self') {
      this.id = this.fbuser.id;
    } else {
      this.id = this._Activatedroute.snapshot.paramMap.get('id');
    }

    this.db.object('/users/' + this.id)
      .valueChanges().subscribe(
        (results: any[]) => {
          this.user = results;
        }

      );

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
