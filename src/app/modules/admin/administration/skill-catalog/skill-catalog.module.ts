import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SkillCatalogComponent } from './skill-catalog.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseConfirmationModule } from '@fuse/services/confirmation';

const skillcatalogRoutes: Route[] = [
  {
    path: '',
    component: SkillCatalogComponent
  }
];

@NgModule({
  declarations: [
    SkillCatalogComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FuseAlertModule,
    FuseCardModule,
    FuseConfirmationModule,
    RouterModule.forChild(skillcatalogRoutes)
  ]
})
export class SkillCatalogModule { }
