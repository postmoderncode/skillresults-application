import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySkillsComponent } from './my-skills.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const myskillsRoutes: Route[] = [
    {
        path     : '',
        component: MySkillsComponent
    }
];

@NgModule({
  declarations: [
    MySkillsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(myskillsRoutes)
  ]
})
export class MySkillsModule { }
