import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicReportsComponent } from './public-reports.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



const publicreportsRoutes: Route[] = [
  {
    path: '',
    component: PublicReportsComponent
  }
];


@NgModule({
  declarations: [
    PublicReportsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forChild(publicreportsRoutes)
  ]
})
export class PublicReportsModule { }
