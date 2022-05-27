import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';

//Firebase Module Inserts (6.0 Compatiblity mode)
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

//AngularFire Model Insterts (New 7.0 Mode - Not ready for prod yet)
//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
//import { provideAuth,getAuth } from '@angular/fire/auth';
//import { provideDatabase,getDatabase } from '@angular/fire/database';
//import { provideStorage,getStorage } from '@angular/fire/storage';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        
        //AngularFire Initalize across the entire app. 
        AngularFireModule.initializeApp(environment.firebase),

        //AngularFire 7.0 Initalizers - Not prod ready yet.. 
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        //provideAuth(() => getAuth()),
        //provideDatabase(() => getDatabase()),
        //provideStorage(() => getStorage()),
        //AngularFireModule.initializeApp(environment.firebase),
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
