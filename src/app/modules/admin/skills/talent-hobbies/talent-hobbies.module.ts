import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalentHobbiesComponent } from './talent-hobbies.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const talenthobbiesRoutes: Route[] = [
    {
        path     : '',
        component: TalentHobbiesComponent
    }
];


@NgModule({
  declarations: [
    TalentHobbiesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(talenthobbiesRoutes)
  ]
})
export class TalentHobbiesModule { }
