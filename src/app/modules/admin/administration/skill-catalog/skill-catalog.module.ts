import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCatalogComponent } from './skill-catalog.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const skillcatalogRoutes: Route[] = [
    {
        path     : '',
        component: SkillCatalogComponent
    }
];

@NgModule({
  declarations: [
    SkillCatalogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(skillcatalogRoutes)
  ]
})
export class SkillCatalogModule { }
