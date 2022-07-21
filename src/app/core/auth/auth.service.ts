import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

//Firebase Imports
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from '../user/user.types';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable()
export class AuthService {
    private MStoken
    private MSuserimage
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private auth: AngularFireAuth,
        private _httpClient: HttpClient,
        public _userService: UserService,
        private db: AngularFireDatabase
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
      * Sign in
      *
      * @param credentials
      */
    signIn(credentials: {
        email: string; password: string
    }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('fbuser');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string; email: string; password: string; company: string
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string; password: string
    }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    //---------------------------------------------
    //CUSTOM FUNCTIONS
    //---------------------------------------------

    //Observable Function to Call MS Graph API and get User Picture.
    msuserinfo(token): Observable<any> {
        //Create a custom http header with the MS Authentication Token to add to the Graph API Call
        let reqHeader = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        })

        //Make the Graph API Call
        return this._httpClient.get('https://graph.microsoft.com/v1.0/me/photos/240x240/$value', {
            responseType: 'blob',
            headers: reqHeader
        });
    }

    //Promise based Function to convert Blob objects to Base64 Strings. 
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    //Microsoft SSO Login with OAuth
    OAuthMicrosoft(): Observable<any> {

        const loginObservable = new Observable(observer => {

            //Sign in using a redirect to Microsoft. 
            this.auth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
                .then(async (result) => {

                    const fbuser = new FirebaseUser();
                    const lastlogged = serverTimestamp();
                    fbuser.key = result.user.uid;
                    fbuser.id = result.user.uid;
                    fbuser.name = result.user.displayName;
                    fbuser.email = result.user.email;
                    fbuser.lastlogged = lastlogged;

                    //See if user exists and if they are flagged as Admin
                    firebase.database().ref('userlist/' + result.user.uid).once('value', function (snapshot) {
                        if (snapshot.exists() && snapshot.val().isadmin == true) {
                            fbuser.isadmin = true;

                        } else if (snapshot.exists() && snapshot.val().isadmin == false) {
                            fbuser.isadmin = false;

                        } else {
                            fbuser.isadmin = false;
                        }

                    }).then(_ => {

                        // Write user to Firebase with Promise
                        const promise_writeuser = this.db.object('users/' + result.user.uid + '/').update(fbuser);
                        promise_writeuser
                            .then(_ => {

                                //write user to userlist
                                const promise_writeuserlist = this.db.object('userlist/' + result.user.uid + '/').update(fbuser);
                                promise_writeuserlist;

                                //store user in local storage
                                localStorage.setItem('fbuser', JSON.stringify(fbuser));

                            })
                            .catch(err =>
                                console.log(err, 'ANGULAR FIRE USER WRITE: Error!')
                            );

                    })
                        .catch(err =>
                            console.log(err, 'ANGULAR FIRE USER WRITE: Error!')
                        );



                    //Create Path to MS token in the Auth Object
                    const credential = result.credential as firebase.auth.OAuthCredential;
                    //Store MS Token in a Varible on the Auth Service. 
                    this.MStoken = credential.accessToken;

                    //Function to Call the Function that Calls MSGraph. 
                    this.msuserinfo(this.MStoken).subscribe(
                        (response) => {

                            this.getBase64(response).then(
                                data => {

                                    //store the Profile image in local storage
                                    localStorage.setItem("profileImage", data.toString());
                                    //const base64image = data;

                                    //Store the user on the user service
                                    const msuser: User = {
                                        id: result.user.uid,
                                        name: result.user.displayName,
                                        email: result.user.email,
                                        avatar: data.toString(),
                                    };

                                    //Send the User Object to the User Service (for the UI)
                                    this._userService.user = msuser;

                                    observer.next();

                                }
                            );

                        },

                        (error) => {
                            console.log(error);
                        });

                    //Store the access token in the local storage (THIS MUST BE AFTER THE GRAPH CALL!!!)
                    var FirebaseToken = (await result.user.getIdToken()).toString();
                    //Also store the Firebase Token in a Varible on the Auth Service. 
                    this.accessToken = FirebaseToken;

                    //Set the authenticated flag to true
                    this._authenticated = true;

                })
                .catch((error) => {
                    console.log(error);
                    // Handle error.
                })

        });

        return loginObservable;

    }

    /**
     * Check if Firebase is Logged In
     */
    firebaseCheck(): Observable<any> {

        // Renew token
        const firebaseCheckObservable = new Observable(observer => {

            const authcheck = getAuth();
            onAuthStateChanged(authcheck, (user) => {

                console.log(user);

                //Set the authenticated flag to true
                this._authenticated = true;

                //Store the user on the user service
                const msuser: User = {
                    id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    avatar: localStorage.getItem("profileImage"),
                };

                //Talk to the User Service
                this._userService.user = msuser;

                observer.next();

            })

        });

        return firebaseCheckObservable;

    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check to See if the Auth Service is already Authenticated. If not, RouteGaurd will dispaly the login page. 
        // If the Auth Service is already Authenticated, then everything we need (Access Tokens, User profiles, etc.. should be already loaded.)
        if (this._authenticated) {
            //Return "TRUE" (I am authenticated) so that Route Gaurd can forward to the protected areas
            return of(true);
        }

        //Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        console.log(AuthUtils.isTokenExpired(this.accessToken));

        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        //Check to see if there is a Firebase Access Token in Local Storage, and if so, use it to auto-login. 

        return this.firebaseCheck();

        // If the access token exists and it didn't expire, sign in using it
        //return this.signInUsingToken();
    }
}

// Empty User class
export class FirebaseUser {

    constructor(
        public key: string = '',
        public id: string = '',
        public name: string = '',
        public email: string = '',
        public isadmin: boolean = null,
        public lastlogged: object = {},

    ) { }

}
