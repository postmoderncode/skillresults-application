import {Component,OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import {Observable,} from 'rxjs';

@Component({
    selector: 'app-add-skills',
    templateUrl: './add-skills.component.html',
    styleUrls: ['./add-skills.component.scss']
})

export class AddSkillsComponent implements OnInit {

    //Constructor
    //----------
    constructor(
        public db: AngularFireDatabase
    ) {}
    
    //Initialize Varables
    //-------------------

    //Object to Hold All Areas. 
    areas: Observable <any>;

    //Object to Hold Current Category List. 
    categories: object ;

    //Object to Hold Current Skill List. 
    skills: object;

    //General Component Variables
    selectedIndex = 0;
    tabTitle = "Please Select a Skill Area"

    //Function to Handle the Back Arrow
    goback(): void {
        switch (this.selectedIndex) {
            case 1: {
                this.tabTitle = "Please Select a Skill Area";
                this.selectedIndex = 0;
                break;
            }
            case 2: {
                this.tabTitle = "Now, select a category...";
                this.selectedIndex = 1;
                break;
            }
        }
    }

    //Function to call when an area is selected
    onAreaSelect(areaId) {

        //Populate Categories - Firebase List w/ Sort&Filter Query
        this.db.list('/skillcatalog/categories/', ref => ref
            .orderByChild("area")
            .equalTo(areaId))
            .snapshotChanges().subscribe(
                (results: object) => {this.categories = results;}
            );
        
        //Set the title
        this.tabTitle = "Now, select a category...";

        //Set the tab to categories
        this.selectedIndex = 1;
    }

    //Function to call when a category is selected
    onCategorySelect(categoryId) {

        console.log(categoryId);

        //Populate Categories - Firebase List w/ Sort&Filter Query
        this.db.list('/skillcatalog/skills/', ref => ref
            .orderByChild("category")
            .equalTo(categoryId))
            .snapshotChanges().subscribe(
                (results: object) => {this.skills = results;}
            );

        this.tabTitle = "Then select a Skill to Add!";
        this.selectedIndex = 2;
    }

    //Funtion that runs on startup
    ngOnInit(): void {

        //Populate Areas - Firebase List Object
        this.areas = this.db.list('/skillcatalog/areas/').snapshotChanges();

    }

}
