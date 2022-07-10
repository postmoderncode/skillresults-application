import { NgModule } from '@angular/core';
import { WishlistComponent } from './wishlist.component';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { WishlistAwardsComponent } from './wishlist-awards/wishlist-awards.component';
import { WishlistDegreesComponent } from './wishlist-degrees/wishlist-degrees.component';
import { WishlistSkillsComponent } from './wishlist-skills/wishlist-skills.component';
import { WishlistTrainingComponent } from './wishlist-training/wishlist-training.component';
import { WishlistCertificatesComponent } from './wishlist-certificates/wishlist-certificates.component';

const wishlistRoutes: Route[] = [
  {
    path: '',
    component: WishlistComponent
  }
];

@NgModule({
  declarations: [
    WishlistComponent,
    WishlistAwardsComponent,
    WishlistDegreesComponent,
    WishlistSkillsComponent,
    WishlistTrainingComponent,
    WishlistCertificatesComponent
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
    MatAutocompleteModule,
    MatNativeDateModule,
    FuseAlertModule,
    FuseCardModule,
    FuseConfirmationModule,
    MatSliderModule,
    SharedModule,
    RouterModule.forChild(wishlistRoutes)
  ]
})
export class WishlistModule { }
