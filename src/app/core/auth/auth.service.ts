import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from '../user/user.types';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private auth: AngularFireAuth,
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
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
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }
    
    

//AUTH SERVICE MS SSO SIGN IN. 

    OAuthMicrosoft(): Observable<any> {

        console.log('2. OAuthMicrosoft() on app/core/auth/auth.service.ts Fired...Calling OAuth Login to AzureAD...');

        const studentsObservable = new Observable(observer => {

            //Sign in using a redirect to Microsoft. 
            this.auth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
                .then(async (result) => {

                    console.log('3. OAuthMicrosoft() completed the Oauth Login to AzureAD...');

                    console.log('4. OAuthMicrosoft() is Storing the AAD Oauth Access Token..');

                    //Store the access token in the local storage
                    var token = (await result.user.getIdToken()).toString();
                    console.log(token);
                    this.accessToken = token;

                    console.log('5. OAuthMicrosoft() is setting _Authenticated = true');

                    //Set the authenticated flag to true
                    this._authenticated = true;

                    //Store the user on the user service
                    const msuser: User = {
                        id: result.user.uid,
                        name: result.user.displayName,
                        email: result.user.email,
                        //avatar: result.user.photoURL,
                        avatar: 'photo.jpg',
                    };

                    //Talk to the User Service
                    console.log("6. OAuthMicrosoft() is Calling the _userService.user ");
                    this._userService.user = msuser;

                    observer.next();

                })
                .catch((error) => {
                    console.log(error);
                    // Handle error.
                })

        });

        return studentsObservable;
    }
    
    //Microsoft Sign In
//    signInMS(): Observable<any> {
//        // Throw error, if the user is already logged in
//        if (this._authenticated) {
//            return throwError('User is already logged in.');
//        }
//
//        //Create the Oath Provider Object. 
//        //const provider = new firebase.auth.OAuthProvider('microsoft.com');
//
//        //Sign in using a redirect to Microsoft. 
//        this.auth.signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
//            .then(async (result) => {
//
//                console.log('Print Object-------');
//                console.log(result);
//
//                // // Store the access token in the local storage
//                console.log('Store Token-------');
//                this.accessToken = ((await result.user.getIdToken()));
//
//                // Set the authenticated flag to true
//                console.log('Set _Authenticated to True-------');
//                this._authenticated = true;
//
//                // Store the user on the user service
//                const msuser = {
//                    id: result.user.uid,
//                    name: result.user.displayName,
//                    email: result.user.email,
//                };
//
//                this._userService.user = msuser;
//
//                console.log(this._userService.user);
//
//                // Return a new observable with the response
//                return of(true);
//
//            })
//            .catch((error) => {
//                console.log(error);
//                // Handle error.
//            });
//    }
    
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
                    avatar: user.photoURL,
                };

                //Talk to the User Service
                console.log("6. Calling the _userService.user.");
                this._userService.user = msuser;

                observer.next();

            })

        });

        return firebaseCheckObservable;

    }


    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
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
    signInUsingToken(): Observable<any>
    {
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
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

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
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        console.log("Step A - Check Authentication...")
        console.log(this._authenticated);
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        console.log("Step B - Check for Access Token...")
        console.log(this.accessToken);
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        console.log("Step C - Check if the Access Token is Expired...")
        console.log(AuthUtils.isTokenExpired(this.accessToken));

        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        //Check to see if there is firebase auth logged in
        console.log("Step D. - Is Firebase Logged in...")
        return this.firebaseCheck();

        // If the access token exists and it didn't expire, sign in using it
        //return this.signInUsingToken();
    }
}
