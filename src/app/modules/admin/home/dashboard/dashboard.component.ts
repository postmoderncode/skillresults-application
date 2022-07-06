import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //Constructor
  //---------------------
  constructor(
    public db: AngularFireDatabase
  ) { }

  //Initialize Variables
  //---------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Firebase Observables
  counts;


  //Functions
  //---------------------

  ngOnInit(): void {

    this.db.object('/counts/' + this.fbuser.id)
      .valueChanges().subscribe(
        (results: any[]) => {
          console.log(results);
          this.counts = results;
        }

      );

  }

}
