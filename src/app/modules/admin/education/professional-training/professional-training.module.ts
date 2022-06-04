import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalTrainingComponent } from './professional-training.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const professionaltrainingRoutes: Route[] = [
    {
        path     : '',
        component: ProfessionalTrainingComponent
    }
];


@NgModule({
  declarations: [
    ProfessionalTrainingComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(professionaltrainingRoutes)
  ]
})
export class ProfessionalTrainingModule { }
