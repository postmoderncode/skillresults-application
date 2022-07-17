import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [


    // Redirect empty path to '/example'
    // { path: '', pathMatch: 'full', redirectTo: 'home/dashboard' },
    { path: '', pathMatch: 'full', redirectTo: 'home/dashboard' },


    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'home/dashboard' },
    //{path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'skills/add-skills'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },

        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [



            // Home Areas
            {
                path: 'home', children: [
                    { path: 'dashboard', loadChildren: () => import('app/modules/admin/home/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'public-profile/:id', loadChildren: () => import('app/modules/admin/home/public-profile/public-profile.module').then(m => m.PublicProfileModule) },
                    //{ path: 'public-profile', loadChildren: () => import('app/modules/admin/home/public-profile/public-profile.module').then(m => m.PublicProfileModule) },
                    { path: 'my-settings', loadChildren: () => import('app/modules/admin/home/my-settings/my-settings.module').then(m => m.MySettingsModule) },
                ]
            },

            // Skills Areas
            {
                path: 'skills', children: [
                    { path: 'my-skills', loadChildren: () => import('app/modules/admin/skills/my-skills/my-skills.module').then(m => m.MySkillsModule) },
                    { path: 'talents-hobbies', loadChildren: () => import('app/modules/admin/skills/talents-hobbies/talents-hobbies.module').then(m => m.TalentsHobbiesModule) },
                ]
            },

            // Educations Areas
            {
                path: 'education', children: [
                    { path: 'academic-degrees', loadChildren: () => import('app/modules/admin/education/academic-degrees/academic-degrees.module').then(m => m.AcademicDegreesModule) },
                    { path: 'awards-accolades', loadChildren: () => import('app/modules/admin/education/awards-accolades/awards-accolades.module').then(m => m.AwardsAccoladesModule) },
                    { path: 'certifications-licenses', loadChildren: () => import('app/modules/admin/education/certifications-licenses/certifications-licenses.module').then(m => m.CertificationsLicensesModule) },
                    { path: 'professional-training', loadChildren: () => import('app/modules/admin/education/professional-training/professional-training.module').then(m => m.ProfessionalTrainingModule) },
                ]
            },

            // Reports Areas
            {
                path: 'reports', children: [
                    { path: 'my-reports', loadChildren: () => import('app/modules/admin/reports/my-reports/my-reports.module').then(m => m.MyReportsModule) },
                    { path: 'report-catalog', loadChildren: () => import('app/modules/admin/reports/report-catalog/report-catalog.module').then(m => m.ReportCatalogModule) },
                ]
            },

            // Administration Areas
            {
                path: 'administration', children: [
                    { path: 'admin-reports', loadChildren: () => import('app/modules/admin/administration/admin-reports/admin-reports.module').then(m => m.AdminReportsModule) },
                    { path: 'global-settings', loadChildren: () => import('app/modules/admin/administration/global-settings/global-settings.module').then(m => m.GlobalSettingsModule) },
                    { path: 'skill-catalog', loadChildren: () => import('app/modules/admin/administration/skill-catalog/skill-catalog.module').then(m => m.SkillCatalogModule) },
                    { path: 'positions', loadChildren: () => import('app/modules/admin/administration/positions/positions.module').then(m => m.PositionsModule) }
                ]
            },
            // Wishklist Areas
            {

                path: 'wishlist', loadChildren: () => import('app/modules/admin/wishlist/wishlist.module').then(m => m.WishlistModule),

            },
            { path: '**', redirectTo: '/' },
        ]
    }
];
