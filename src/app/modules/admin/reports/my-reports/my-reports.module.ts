import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyReportsComponent } from './my-reports.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const myreportsRoutes: Route[] = [
    {
        path     : '',
        component: MyReportsComponent
    }
];

@NgModule({
  declarations: [
    MyReportsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(myreportsRoutes)
  ]
})
export class MyReportsModule { }
