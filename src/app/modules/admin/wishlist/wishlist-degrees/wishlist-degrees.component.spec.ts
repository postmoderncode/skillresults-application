import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistDegreesComponent } from './wishlist-degrees.component';

describe('WishlistDegreesComponent', () => {
  let component: WishlistDegreesComponent;
  let fixture: ComponentFixture<WishlistDegreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistDegreesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
