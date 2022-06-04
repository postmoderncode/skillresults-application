import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificationsLicensesComponent } from './certifications-licenses.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const certificationslicensesRoutes: Route[] = [
    {
        path     : '',
        component: CertificationsLicensesComponent
    }
];

@NgModule({
  declarations: [
    CertificationsLicensesComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(certificationslicensesRoutes)
  ]
})
export class CertificationsLicensesModule { }
