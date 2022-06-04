import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillWishlistComponent } from './skill-wishlist.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const skillwishlistRoutes: Route[] = [
    {
        path     : '',
        component: SkillWishlistComponent
    }
];

@NgModule({
  declarations: [
    SkillWishlistComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(skillwishlistRoutes)
  ]
})
export class SkillWishlistModule { }
