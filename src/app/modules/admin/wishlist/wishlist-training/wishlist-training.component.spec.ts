import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistTrainingComponent } from './wishlist-training.component';

describe('WishlistTrainingComponent', () => {
  let component: WishlistTrainingComponent;
  let fixture: ComponentFixture<WishlistTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
