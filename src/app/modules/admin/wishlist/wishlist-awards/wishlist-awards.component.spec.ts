import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistAwardsComponent } from './wishlist-awards.component';

describe('WishlistAwardsComponent', () => {
  let component: WishlistAwardsComponent;
  let fixture: ComponentFixture<WishlistAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistAwardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
