import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistCertificatesComponent } from './wishlist-certificates.component';

describe('WishlistCertificatesComponent', () => {
  let component: WishlistCertificatesComponent;
  let fixture: ComponentFixture<WishlistCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistCertificatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
