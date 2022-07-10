import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  //Initialize Variables
  //---------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Firebase Observables
  counts;

  //Total Wishlists
  wishlistscount;


  //Constructor
  //---------------------
  constructor(
    public db: AngularFireDatabase
  ) { }


  //Functions
  //---------------------

  ngOnInit(): void {

    this.db.object('/counts/' + this.fbuser.id)
      .valueChanges().subscribe(
        (results: any[]) => {
          console.log(results);
          this.counts = results;
          this.wishlistscount = (this.counts.wishlists?.awards ?? 0) +
            (this.counts.wishlists?.certificates ?? 0) +
            (this.counts.wishlists?.degrees ?? 0) +
            (this.counts.wishlists?.skills ?? 0) +
            (this.counts.wishlists?.training ?? 0)


        }

      );

  }

}
