import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSettingsComponent } from './global-settings.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const globalsettingsRoutes: Route[] = [
    {
        path     : '',
        component: GlobalSettingsComponent
    }
];

@NgModule({
  declarations: [
    GlobalSettingsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(globalsettingsRoutes)
  ]
})
export class GlobalSettingsModule { }