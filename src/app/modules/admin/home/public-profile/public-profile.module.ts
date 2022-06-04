import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PublicProfileComponent } from './public-profile.component';
import { MatIconModule } from '@angular/material/icon';

const publicprofileRoutes: Route[] = [
    {
        path     : '',
        component: PublicProfileComponent
    }
];

@NgModule({
  declarations: [
    PublicProfileComponent
  ],
  imports: [
    CommonModule,
      MatIconModule,
    RouterModule.forChild(publicprofileRoutes)
  ]
})
export class PublicProfileModule { }
