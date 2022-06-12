import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSkillsComponent } from './add-skills.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

const addskillsRoutes: Route[] = [
    {
        path     : '',
        component: AddSkillsComponent
    }
];

@NgModule({
  declarations: [
    AddSkillsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    RouterModule.forChild(addskillsRoutes)
  ]
})
export class AddSkillsModule { }
