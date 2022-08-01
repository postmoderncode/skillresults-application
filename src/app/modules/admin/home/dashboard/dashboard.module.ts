import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { FuseCardModule } from '@fuse/components/card';

const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    MatCardModule,
    FuseCardModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardModule { }