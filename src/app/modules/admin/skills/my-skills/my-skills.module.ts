import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySkillsComponent } from './my-skills.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
    RouterModule.forChild(myskillsRoutes)
  ]
})
export class MySkillsModule { }
