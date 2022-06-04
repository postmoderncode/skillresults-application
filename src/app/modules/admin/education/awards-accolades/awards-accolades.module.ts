import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardsAccoladesComponent } from './awards-accolades.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const awardsaccoladesRoutes: Route[] = [
    {
        path     : '',
        component: AwardsAccoladesComponent
    }
];

@NgModule({
  declarations: [
    AwardsAccoladesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(awardsaccoladesRoutes)
  ]
})
export class AwardsAccoladesModule { }
