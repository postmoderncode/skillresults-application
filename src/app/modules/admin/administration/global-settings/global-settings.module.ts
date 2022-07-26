import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GlobalSettingsComponent } from './global-settings.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';


const globalsettingsRoutes: Route[] = [
  {
    path: '',
    component: GlobalSettingsComponent
  }
];

@NgModule({
  declarations: [
    GlobalSettingsComponent
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTooltipModule,
    SharedModule,
    RouterModule.forChild(globalsettingsRoutes)
  ]
})
export class GlobalSettingsModule { }