import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PositionsComponent } from './positions.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


const positionsRoutes: Route[] = [
  {
    path: '',
    component: PositionsComponent
  }
];

@NgModule({
  declarations: [
    PositionsComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    RouterModule.forChild(positionsRoutes)
  ]
})
export class PositionsModule { }
