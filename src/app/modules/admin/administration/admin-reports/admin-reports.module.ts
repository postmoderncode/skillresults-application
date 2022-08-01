import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AdminReportsComponent } from './admin-reports.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const adminreportsRoutes: Route[] = [
  {
    path: '',
    component: AdminReportsComponent
  }
];



@NgModule({
  declarations: [
    AdminReportsComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    RouterModule.forChild(adminreportsRoutes)
  ]
})
export class AdminReportsModule { }
