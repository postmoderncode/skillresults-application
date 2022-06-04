import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportsComponent } from './admin-reports.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const adminreportsRoutes: Route[] = [
    {
        path     : '',
        component: AdminReportsComponent
    }
];



@NgModule({
  declarations: [
    AdminReportsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(adminreportsRoutes)
  ]
})
export class AdminReportsModule { }
