import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
    {
        console.log("--------noAuthguard canActivate Check")
        return this._check();
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        console.log("--------noAuthguard canActivateChild Check")
        return this._check();
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    {
        console.log("----------noAuthguard canLoad Check")
        return this._check();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @private
     */
    private _check(): Observable<boolean>
    {
        console.log("noAuth.Gaurd _check fired.")
        // Check the authentication status
        return this._authService.check()
                   .pipe(
                       switchMap((authenticated) => {

                           // If the user is authenticated...
                           if ( authenticated )
                           {
                                console.log("noAuth.Gaurd detected AuthService._check is authenticated and forwarding to root.");
                                console.log(authenticated);
                               // Redirect to the root
                               this._router.navigate(['']);

                               // Prevent the access
                               return of(false);
                           }
                            console.log("noAuth.Gaurd is allowing access to unprotected area.");
                           // Allow the access
                           return of(true);
                       })
                   );
    }
}
