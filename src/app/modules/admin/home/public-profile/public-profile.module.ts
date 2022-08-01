import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { PublicProfileComponent } from './public-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

const publicprofileRoutes: Route[] = [
  {
    path: '',
    component: PublicProfileComponent
  }
];

@NgModule({
  declarations: [
    PublicProfileComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule.forChild(publicprofileRoutes)
  ]
})
export class PublicProfileModule { }
