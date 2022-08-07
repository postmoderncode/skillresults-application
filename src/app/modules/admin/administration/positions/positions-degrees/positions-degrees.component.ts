import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-positions-degrees',
  templateUrl: './positions-degrees.component.html',
  styleUrls: ['./positions-degrees.component.scss']
})
export class PositionsDegreesComponent implements OnInit, OnDestroy, AfterViewInit {

  //Initialize Varables
  //-------------------

  //Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Container to hold a list of items
  items: object;

  //Container to hold a single item
  item: Observable<any>;

  //Container for Strongly typed Model.
  model = new Degree();

  //Autocomplete Data
  fieldfilteredData;

  fieldoptions: string[] = ['Accounting', 'Advertising', 'African-American Studies', 'Agriculture', 'Animal Science', 'Anthropology', 'Aerospace Engineering', 'Archaeology', 'Architecture', 'Art History', 'Arts Management', 'Asian-American Studies', 'Astronomy and Astrophysics', 'Bilingual/Crosscultural Education', 'Athletic Training', 'Biochemistry', 'Biology', 'Biomedical Engineering', 'Business', 'Chemical Engineering', 'Chemistry', 'Civil Engineering', 'Classical Studies', 'Communication Disorders Sciences and Services', 'Communications', 'Comparative Literature', 'Computer Engineering', 'Computer Information Systems', 'Computer Science', 'Construction Services', 'Cosmetology Services', 'Creative Writing', 'Criminology', 'Culinary Arts', 'Cybersecurity', 'Design', 'Economics', 'Education', 'Electrical Engineering', 'Elementary Education', 'Engineering', 'English Language and Literature', 'Entomology', 'Environmental Engineering', 'Film and Video Production', 'Film-Video Arts', 'Finance', 'Fine Arts', 'Fire Safety Science', 'Food Science', 'Foreign Languages', 'Forestry', 'Gender Studies', 'Genetics', 'Geology', 'Graphic Design', 'Health Sciences', 'History', 'Hospitality Management', 'Human Ecology', 'Industrial Technology', 'International Business', 'International Relations', 'Journalism', 'Kinesiology', 'Latin American Studies', 'Liberal Studies', 'Library Science', 'Linguistics', 'Logistics Management', 'Marketing', 'Mathematics', 'Mechanical Engineering', 'Medical Technology', 'Metallurgical Engineering', 'Meteorology', 'Microbiology', 'Military Technology', 'Mining and Mineral Engineering', 'Music', 'Mythology and Folklore', 'Naval Architecture and Marine Engineering', 'Neuroscience', 'Nuclear Engineering', 'Nursing', 'Oceanography', 'Occupational Health and Safety', 'Parks, Recreation, and Leisure Studies', 'Performing Arts', 'Petroleum Engineering', 'Pharmacology', 'Philosophy', 'Photography', 'Physics', 'Physiology', 'Plant Science', 'Political Science', 'Pre-Law', 'Psychology', 'Public Administration', 'Puppetry', 'Religious Studies', 'Rhetoric', 'Social Work', 'Sociology', 'Software Engineering', 'Special Education', 'Sports Medicine', 'Statistics', 'Student Counseling', 'Supply Chain Management', 'Theater Arts', 'Viticulture', 'Zoology']

  //Dropdown List Data
  degreetypesfilteredData;

  degreelevels =
    [
      { level: '1', name: 'Associate' },
      { level: '2', name: 'Bachelors' },
      { level: '3', name: 'Masters' },
      { level: '4', name: 'Doctoral' }
    ];

  degreetypes =
    [
      { name: 'Associate of Arts (AA)', degreeLevel: '1' },
      { name: 'Associate of Science (AS)', degreeLevel: '1' },
      { name: 'Associate of Applied Science (AAS)', degreeLevel: '1' },
      { name: 'Associate of Applied Arts and Science (AAAS)', degreeLevel: '1' },
      { name: 'Bachelor of Architecture (B.Arch.)', degreeLevel: '2' },
      { name: 'Bachelor of Applied Arts and Science (BAAS)', degreeLevel: '2' },
      { name: 'Bachelor of Applied Science (BAS)', degreeLevel: '2' },
      { name: 'Bachelor of Arts (B.A.)', degreeLevel: '2' },
      { name: 'Bachelor of Business Administration(BBA)', degreeLevel: '2' },
      { name: 'Bachelor of Fine Arts (BFA)', degreeLevel: '2' },
      { name: 'Bachelor of Science (B.S.)', degreeLevel: '2' },
      { name: 'Master of Arts (M.A.)', degreeLevel: '3' },
      { name: 'Master of Business Administration (MBA)', degreeLevel: '3' },
      { name: 'Master of Education (M.Ed.)', degreeLevel: '3' },
      { name: 'Master of Fine Arts (MFA)', degreeLevel: '3' },
      { name: 'Master of Science (M.S.)', degreeLevel: '3' },
      { name: 'Master of Laws (LL.M.)', degreeLevel: '3' },
      { name: 'Master of Public Administration (MPA)', degreeLevel: '3' },
      { name: 'Master of Public Health (MPH)', degreeLevel: '3' },
      { name: 'Master of Publishing (M.Pub.)', degreeLevel: '3' },
      { name: 'Master of Social Work (MSW)', degreeLevel: '3' },
      { name: 'Doctor of Business Administration (DBA)', degreeLevel: '4' },
      { name: 'Doctor of Dental Surgery (DDS)', degreeLevel: '4' },
      { name: 'Doctor of Education (Ed.D.)', degreeLevel: '4' },
      { name: 'Doctor of Medicine (M.D.)', degreeLevel: '4' },
      { name: 'Doctor of Pharmacy (Pharm.D.)', degreeLevel: '4' },
      { name: 'Doctor of Philosophy (Ph.D.)', degreeLevel: '4' },
      { name: 'Doctor of Psychology (Psy.D.)', degreeLevel: '4' },
      { name: 'Juris Doctor (J.D.)', degreeLevel: '4' }

    ];

  //Unscubscribe All
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  //Constructor
  //---------------------
  constructor(
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    public db: AngularFireDatabase
  ) { }


  //Functions
  //---------------------

  //Function - Filter for Field of Study Autocomplete
  applyFilterFields(evt: string): void {
    evt = evt + '';
    if (!evt) { this.fieldfilteredData = this.fieldoptions; }
    else {
      this.fieldfilteredData = this.fieldoptions.filter(item => (item + '') === evt || item.toLocaleLowerCase().indexOf(evt.toLocaleLowerCase()) >= 0);
    }
  }

  //Function - Change fileter of degree types based on degree level dropdown
  onDegreeLevelChanged(ob): void {

    this.degreetypesfilteredData = this.degreetypes.filter(degreetypes => degreetypes.degreeLevel === ob.value.toString());

  }

  //Function - Show the Delete Conf.
  onShowDelete(key): void {

    //Formbuilder for Dialog Popup
    const dialogconfigForm = this._formBuilder.group({
      title: 'Remove Item',
      message: 'Are you sure you want to remove this item permanently? <span class="font-medium">This action cannot be undone!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn'
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Remove',
          color: 'warn'
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'Cancel'
        })
      }),
      dismissible: false
    });

    //Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(dialogconfigForm.value);

    //Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        //Call Actual Delete
        this.onDelete(key);
      }
    });
  }

  //Function - Delete Item in DB
  onDelete(key): void {

    //Make sure empty key isn't passed to wipe database
    if (key.length > 5) {

      // //Delete Item from the Item Node.
      // this.db.object('/certifications/' + key).remove().then((responseObject) => {

      //   //Delete Item from the User Node.
      //   this.db.object('/users/' + this.fbuser.id + '/certifications/' + key).remove().then((responseObject) => {

      //   }
      //   )

      //     //Error Handling
      //     .catch(errorObject => console.log(errorObject, 'Remove Item from the User Node Failed!'));

      // }
      // )

      //   //Error Handling
      //   .catch(errorObject => console.log(errorObject, 'Remove Item from the Item Node Failed!'));

    }

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


// -----------------------------------------------------------------------------------------------------
// @ Models
// -----------------------------------------------------------------------------------------------------

// Empty Degree class
export class Degree {

  constructor(

    public degreelevel: string = '',
    public degreetype: string = '',
    public major: string = '',
    public relatedfield: boolean = false,
    public equivexperience: boolean = false,

  ) { }

}