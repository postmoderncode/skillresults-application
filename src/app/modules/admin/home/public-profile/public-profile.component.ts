import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})

export class PublicProfileComponent implements OnInit {

  //Initialize Variables
  //---------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Firebase Observables
  user;


  //Constructor
  //---------------------
  constructor(
    public db: AngularFireDatabase
  ) { }


  //Functions
  //---------------------

  ngOnInit(): void {

    this.db.object('/users/' + this.fbuser.id)
      .valueChanges().subscribe(
        (results: any[]) => {
          console.log(results);
          this.user = results;
        }

      );
  }

}
