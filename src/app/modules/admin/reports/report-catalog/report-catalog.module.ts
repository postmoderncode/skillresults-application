import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCatalogComponent } from './report-catalog.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

const reportcatalogRoutes: Route[] = [
  {
    path: '',
    component: ReportCatalogComponent
  }
];

@NgModule({
  declarations: [
    ReportCatalogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    RouterModule.forChild(reportcatalogRoutes)
  ]
})
export class ReportCatalogModule { }