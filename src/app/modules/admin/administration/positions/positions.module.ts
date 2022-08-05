import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PositionsComponent } from './positions.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { PositionsDegreesComponent } from './positions-degrees/positions-degrees.component';
import { PositionsCertificationsComponent } from './positions-certifications/positions-certifications.component';
import { PositionsSkillsComponent } from './positions-skills/positions-skills.component';
import { PositionsDutiesComponent } from './positions-duties/positions-duties.component';



const positionsRoutes: Route[] = [
  {
    path: '',
    component: PositionsComponent
  }
];

@NgModule({
  declarations: [
    PositionsComponent,
    PositionsDegreesComponent,
    PositionsCertificationsComponent,
    PositionsSkillsComponent,
    PositionsDutiesComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatStepperModule,
    FuseAlertModule,
    FuseCardModule,
    FuseConfirmationModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(positionsRoutes)
  ]
})
export class PositionsModule { }
