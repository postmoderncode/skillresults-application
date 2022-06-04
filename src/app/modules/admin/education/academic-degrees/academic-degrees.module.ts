import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicDegreesComponent } from './academic-degrees.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const academicdegreesRoutes: Route[] = [
    {
        path     : '',
        component: AcademicDegreesComponent
    }
];

@NgModule({
  declarations: [
    AcademicDegreesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(academicdegreesRoutes)
  ]
})
export class AcademicDegreesModule { }
