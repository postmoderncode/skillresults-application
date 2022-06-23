import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TalentsHobbiesComponent } from './talents-hobbies.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const talentshobbiesRoutes: Route[] = [
  {
    path: '',
    component: TalentsHobbiesComponent
  }
];

@NgModule({
  declarations: [
    TalentsHobbiesComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    RouterModule.forChild(talentshobbiesRoutes)
  ]
})
export class TalentsHobbiesModule { }
