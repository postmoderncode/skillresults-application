/* eslint-disable max-len */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, NgForm } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable, Subject } from 'rxjs';
import { serverTimestamp } from '@angular/fire/database';
import { CdkScrollable } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-academic-degrees',
  templateUrl: './academic-degrees.component.html',
  styleUrls: ['./academic-degrees.component.scss']
})

export class AcademicDegreesComponent implements OnInit, OnDestroy {

  //Initialize Variables
  //---------------------

  //Scroll element
  @ViewChild(CdkScrollable) cdkScrollable: CdkScrollable;

  //Page View State (Default is "Loading..")
  viewState = 0;

  //Form Mode State (Add vs. Edit Mode)
  formMode = '';

  //Container to hold a list of items
  items: object;

  //Container to hold a single item
  item: Observable<any>;

  //Container for Strongly typed Model.
  model = new Degree();

  //Container for Strongly typed From Date Info.
  formDates = new FormDates();

  //Container to hold Current User
  fbuser = JSON.parse(localStorage.getItem('fbuser'));

  //Container to hold Current Active Item Key
  currentkey = '';

  //Graduation Label Text
  gradDate = 'Date Completed';

  //Autocomplete Data
  schoolfilteredData;
  fieldfilteredData;
  schooloptions;

  fieldoptions: string[] = ['Accounting', 'Advertising', 'African-American Studies', 'Agriculture', 'Animal Science', 'Anthropology', 'Aerospace Engineering', 'Archaeology', 'Architecture', 'Art History', 'Arts Management', 'Asian-American Studies', 'Astronomy and Astrophysics', 'Bilingual/Crosscultural Education', 'Athletic Training', 'Biochemistry', 'Biology', 'Biomedical Engineering', 'Business', 'Chemical Engineering', 'Chemistry', 'Civil Engineering', 'Classical Studies', 'Communication Disorders Sciences and Services', 'Communications', 'Comparative Literature', 'Computer Engineering', 'Computer Information Systems', 'Computer Science', 'Construction Services', 'Cosmetology Services', 'Creative Writing', 'Criminology', 'Culinary Arts', 'Cybersecurity', 'Design', 'Economics', 'Education', 'Electrical Engineering', 'Elementary Education', 'Engineering', 'English Language and Literature', 'Entomology', 'Environmental Engineering', 'Film and Video Production', 'Film-Video Arts', 'Finance', 'Fine Arts', 'Fire Safety Science', 'Food Science', 'Foreign Languages', 'Forestry', 'Gender Studies', 'Genetics', 'Geology', 'Graphic Design', 'Health Sciences', 'History', 'Hospitality Management', 'Human Ecology', 'Industrial Technology', 'International Business', 'International Relations', 'Journalism', 'Kinesiology', 'Latin American Studies', 'Liberal Studies', 'Library Science', 'Linguistics', 'Logistics Management', 'Marketing', 'Mathematics', 'Mechanical Engineering', 'Medical Technology', 'Metallurgical Engineering', 'Meteorology', 'Microbiology', 'Military Technology', 'Mining and Mineral Engineering', 'Music', 'Mythology and Folklore', 'Naval Architecture and Marine Engineering', 'Neuroscience', 'Nuclear Engineering', 'Nursing', 'Oceanography', 'Occupational Health and Safety', 'Parks, Recreation, and Leisure Studies', 'Performing Arts', 'Petroleum Engineering', 'Pharmacology', 'Philosophy', 'Photography', 'Physics', 'Physiology', 'Plant Science', 'Political Science', 'Pre-Law', 'Psychology', 'Public Administration', 'Puppetry', 'Religious Studies', 'Rhetoric', 'Social Work', 'Sociology', 'Software Engineering', 'Special Education', 'Sports Medicine', 'Statistics', 'Student Counseling', 'Supply Chain Management', 'Theater Arts', 'Viticulture', 'Zoology']

  //Dropdown List Data
  degreetypesfilteredData;

  states = [{ 'name': 'Alabama', 'abbreviation': 'AL' }, { 'name': 'Alaska', 'abbreviation': 'AK' }, { 'name': 'Arizona', 'abbreviation': 'AZ' }, { 'name': 'Arkansas', 'abbreviation': 'AR' }, { 'name': 'California', 'abbreviation': 'CA' }, { 'name': 'Colorado', 'abbreviation': 'CO' }, { 'name': 'Connecticut', 'abbreviation': 'CT' }, { 'name': 'Delaware', 'abbreviation': 'DE' }, { 'name': 'Florida', 'abbreviation': 'FL' }, { 'name': 'Georgia', 'abbreviation': 'GA' }, { 'name': 'Hawaii', 'abbreviation': 'HI' }, { 'name': 'Idaho', 'abbreviation': 'ID' }, { 'name': 'Illinois', 'abbreviation': 'IL' }, { 'name': 'Indiana', 'abbreviation': 'IN' }, { 'name': 'Iowa', 'abbreviation': 'IA' }, { 'name': 'Kansas', 'abbreviation': 'KS' }, { 'name': 'Kentucky', 'abbreviation': 'KY' }, { 'name': 'Louisiana', 'abbreviation': 'LA' }, { 'name': 'Maine', 'abbreviation': 'ME' }, { 'name': 'Maryland', 'abbreviation': 'MD' }, { 'name': 'Massachusetts', 'abbreviation': 'MA' }, { 'name': 'Michigan', 'abbreviation': 'MI' }, { 'name': 'Minnesota', 'abbreviation': 'MN' }, { 'name': 'Mississippi', 'abbreviation': 'MS' }, { 'name': 'Missouri', 'abbreviation': 'MO' }, { 'name': 'Montana', 'abbreviation': 'MT' }, { 'name': 'Nebraska', 'abbreviation': 'NE' }, { 'name': 'Nevada', 'abbreviation': 'NV' }, { 'name': 'New Hampshire', 'abbreviation': 'NH' }, { 'name': 'New Jersey', 'abbreviation': 'NJ' }, { 'name': 'New Mexico', 'abbreviation': 'NM' }, { 'name': 'New York', 'abbreviation': 'NY' }, { 'name': 'North Carolina', 'abbreviation': 'NC' }, { 'name': 'North Dakota', 'abbreviation': 'ND' }, { 'name': 'Ohio', 'abbreviation': 'OH' }, { 'name': 'Oklahoma', 'abbreviation': 'OK' }, { 'name': 'Oregon', 'abbreviation': 'OR' }, { 'name': 'Pennsylvania', 'abbreviation': 'PA' }, { 'name': 'Rhode Island', 'abbreviation': 'RI' }, { 'name': 'South Carolina', 'abbreviation': 'SC' }, { 'name': 'South Dakota', 'abbreviation': 'SD' }, { 'name': 'Tennessee', 'abbreviation': 'TN' }, { 'name': 'Texas', 'abbreviation': 'TX' }, { 'name': 'Utah', 'abbreviation': 'UT' }, { 'name': 'Vermont', 'abbreviation': 'VT' }, { 'name': 'Virginia', 'abbreviation': 'VA' }, { 'name': 'Washington', 'abbreviation': 'WA' }, { 'name': 'West Virginia', 'abbreviation': 'WV' }, { 'name': 'Wisconsin', 'abbreviation': 'WI' }, { 'name': 'Wyoming', 'abbreviation': 'WY' }];

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

  //Function - Show the Add Form
  onShowAddForm(): void {

    //Set the View State
    this.viewState = 3;

    //Set the Form Mode
    this.formMode = 'add';
  }

  //Function - Show the Edit Form
  onShowEditForm(key): void {

    //Set the current key
    this.currentkey = key;

    //Set the View State to the form
    this.viewState = 3;

    //Set the Form Mode to Edit
    this.formMode = 'edit';

    //Define Observable Item based on the Key
    this.item = this.db.object('/users/' + this.fbuser.id + '/degrees/' + key).valueChanges();

    //Subscribe to Observable
    this.item.subscribe((response) => {

      //Populate the Item Model with the response date from the DB.
      this.model = response;

      //Populate the "Form Dates Model" with the Unix Epoch Dates (Converted to GMT)
      if (this.model.awardedon != null) {
        this.formDates.awardedonForm = new Date(this.model.awardedon);
      };

    });

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

  //Function - Add New Item to DB
  onAdd(): void {

    //Add the User ID to the Model
    this.model.uid = this.fbuser.id;

    //If the Date "Awarded On" on the Form is not Null, then add it to the item model (in Unix Epoch Time).
    if (this.formDates.awardedonForm != null) {
      this.model.awardedon = this.formDates.awardedonForm.valueOf();
    }

    //Add Server Side Timestamp to the Model
    this.model.created = serverTimestamp();
    this.model.modified = serverTimestamp();

    //Begin Database Calls to add the New Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const addUserItem = this.db.list('/users/' + this.fbuser.id + '/degrees').push(this.model).then((responseObject) => {



      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const addItem = this.db.list('/degrees/').set(responseObject.key, this.model).then((responseObject) => {


        //Increment Count
        this.db.object('/counts/' + this.fbuser.id + '/degrees').query.ref.transaction((counts) => {

          //Reset the Models back to Zero (Which also Resets the Form)
          this.model = new Degree();
          this.formDates = new FormDates();

          //Set the Counts
          if (counts === null) {
            return counts = 1;
          } else {
            return counts + 1;
          }

        });

      })
        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Add Item to Item Node Failed!'));

    })

      //Error Handling
      .catch(errorObject => console.log(errorObject, 'Add Item to User Node Failed!'));

    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });

  }

  //Function - Update Item in DB
  onEdit(key): void {

    //If the Date "Awarded On" on the Form is not Null, then add it to the item model (in Unix Epoch Time).
    if (this.formDates.awardedonForm != null) {
      this.model.awardedon = this.formDates.awardedonForm.valueOf();
    }

    //Add Server Side Timestamp to the Model

    this.model.modified = serverTimestamp();

    //Begin Database Calls to Update the Existing Item
    //----------------------------------------

    //Call the 1st Firebase PromiseObject (To add Item to User Node)
    const editUserItem = this.db.object('/users/' + this.fbuser.id + '/degrees/' + key + '/').update(this.model).then((responseObject) => {

      //Call the 2nd Firebase PromiseObject (To add Item to the Item Node)
      const editItem = this.db.object('/degrees/' + key + '/').update(this.model).then((responseObject) => {

        //Reset the Models back to Zero (Which also Resets the Form)
        this.model = new Degree();
        this.formDates = new FormDates();
        this.currentkey = '';

      })
        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Add Item to Item Node Failed!'));

    })

      //Error Handling
      .catch(errorObject => console.log(errorObject, 'Add Item to User Node Failed!'));

    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });

  }

  //Function - Delete Item in DB
  onDelete(key): void {

    //Make sure empty key isn't passed to wipe database
    if (key.length > 5) {

      //Delete Item from the Item Node.
      this.db.object('/degrees/' + key).remove().then((responseObject) => {


        //Delete Item from the User Node.
        this.db.object('/users/' + this.fbuser.id + '/degrees/' + key).remove().then((responseObject) => {


          //Decrement Count
          this.db.object('/counts/' + this.fbuser.id + '/degrees').query.ref.transaction((counts) => {
            if (counts === null || counts <= 0) {
              return counts = 0;
            } else {
              return counts - 1;
            }
          });

        }
        )

          //Error Handling
          .catch(errorObject => console.log(errorObject, 'Remove Item from the User Node Failed!'));

      }
      )

        //Error Handling
        .catch(errorObject => console.log(errorObject, 'Remove Item from the Item Node Failed!'));

    }

    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });

  }

  //Function - Cancel the Add or Edit Form
  onCancelForm(form: NgForm): void {
    this.model = new Degree();
    this.formDates = new FormDates();
    this.viewState = 1;
    //Scroll to top
    this.cdkScrollable.scrollTo({ top: 0 });
  }


  //Function - Degree Completed Checkbox
  onCompletedChecked($event): void {
    if ($event.checked === true) { this.gradDate = 'Date Completed'; this.model.completed = true; }
    else { this.gradDate = 'Expected Graduation Date'; this.model.completed = false; }
  }


  //Function - Filter for Field of Study Autocomplete
  applyFilterFields(evt: string): void {
    evt = evt + '';
    if (!evt) { this.fieldfilteredData = this.fieldoptions; }
    else {
      this.fieldfilteredData = this.fieldoptions.filter(item => (item + '') === evt || item.toLocaleLowerCase().indexOf(evt.toLocaleLowerCase()) >= 0);
    }
  }


  //Function - Filter for Institution Autocomplete
  applyFilterSchools(evt: string): void {
    evt = evt + '';
    if (!evt) { this.schoolfilteredData = this.schooloptions; }
    else {
      this.schoolfilteredData = this.schooloptions.filter(item => (item + '') === evt || item.name.toLocaleLowerCase().indexOf(evt.toLocaleLowerCase()) >= 0);
    }
  }


  //Function - Change fileter of degree types based on degree level dropdown
  onDegreeLevelChanged(ob): void {

    this.degreetypesfilteredData = this.degreetypes.filter(degreetypes => degreetypes.degreeLevel === ob.value.toString());

  }

  //Function - State Dropdown Change Event
  onStateChange(ob): void {

    this.model.institution = '';

    const selectedState = ob.value;

    this.db.list('/institutions/', ref => ref
      .orderByChild('state')
      .equalTo(selectedState))
      .valueChanges().subscribe(
        (

          results: object) => {
          this.schooloptions = results;
          this.schoolfilteredData = this.schooloptions.filter(institutions => institutions.state === selectedState);

        }
      );

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    //Prepopulate Field of Study Autocomplete
    this.fieldfilteredData = this.fieldoptions;

    //Call the Firebase Database and get the initial data.
    this.db.list('/users/' + this.fbuser.id + '/degrees').snapshotChanges().subscribe(
      (results: object) => {

        //Put the results of the DB call into an object.
        this.items = results;

        //Check if the results object is empty
        if (Object.keys(this.items).length === 0) {
          //It's empty, so set the view state to "No Data" mode.
          this.viewState = 2;
        }
        else {
          //It's not empty, so set the view state to "Show Data" mode.
          this.viewState = 1;
        };

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

// -----------------------------------------------------------------------------------------------------
// @ Models
// -----------------------------------------------------------------------------------------------------

// Empty Degree class
export class Degree {

  constructor(
    public state: string = '',
    public institution: string = '',
    public degreelevel: string = '',
    public degreetype: string = '',
    public major: string = '',
    public minor: string = '',
    public completed: boolean = true,
    public awardedon: number = null,
    public created: object = {},
    public modified: object = {},
    public uid: string = '',

  ) { }

}

// Empty Form Date class - Handles the conversion from UTC to Epoch dates.
export class FormDates {
  constructor(
    public awardedonForm: Date = null,
    public expiresonForm: Date = null,
  ) { }
}


