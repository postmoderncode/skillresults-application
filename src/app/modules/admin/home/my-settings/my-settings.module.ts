import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MySettingsComponent } from './my-settings.component';
import { MatIconModule } from '@angular/material/icon';



const mysettingsRoutes: Route[] = [
    {
        path     : '',
        component: MySettingsComponent
    }
];

@NgModule({
  declarations: [
    MySettingsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,

    RouterModule.forChild(mysettingsRoutes)
  ]
})
export class MySettingsModule { }
