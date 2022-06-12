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
    
    //
    dbRef = this.db.database.ref("/skillcatalog/categories/");
    
    myObserver = {
        next: (x: number) => console.log('Observer got a next value: ' + x),
        error: (err: Error) => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
    };
    

    
    //Initialize Varables
    //-------------------

    //Object to Hold All Areas. 
    areas: Observable <any>;

    //Object to Hold Current Category List. 
    categories: object ;
    categories2: object ;

    //Object to Hold Current Skill List. 
    skills: Observable < any > ;

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
    loadCategories(categoryId) {

        //Populate Categories
        this.db.list('/skillcatalog/categories/', ref => ref.orderByChild("area").equalTo(parseInt(categoryId))).snapshotChanges().subscribe(
            (results: object) => {
                console.log(results);                
                this.categories = results;
            }
        );
        
        //Set the title
        this.tabTitle = "Now, select a category...";

        //Set the tab to categories
        this.selectedIndex = 1;
    }

    //Function to call when a category is selected
    loadSkills(categoryId) {

        console.log(categoryId);
        this.tabTitle = "Then select a Skill to Add!";
        this.selectedIndex = 2;
    }

    //Funtion that runs on startup
    ngOnInit(): void {

        //Populate the Areas Object
        this.areas = this.db.list('/skillcatalog/areas/').snapshotChanges();
        
        //Populate Categories
        this.db.list('/skillcatalog/categories/', ref => ref.orderByChild("area").equalTo(4)).snapshotChanges().subscribe(
            (results: object) => {
                console.log(results);                
                this.categories2 = results;
            }
        );

    }

}
