import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PublicReportsComponent } from './public-reports.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseConfirmationModule } from '@fuse/services/confirmation';



const publicreportsRoutes: Route[] = [
  {
    path: '',
    component: PublicReportsComponent
  }
];


@NgModule({
  declarations: [
    PublicReportsComponent
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
    MatPaginatorModule,
    MatSortModule,
    FuseAlertModule,
    FuseCardModule,
    FuseConfirmationModule,
    SharedModule,
    RouterModule.forChild(publicreportsRoutes)
  ]
})
export class PublicReportsModule { }
