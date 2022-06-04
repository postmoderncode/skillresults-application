import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillWishlistComponent } from './skill-wishlist.component';

describe('SkillWishlistComponent', () => {
  let component: SkillWishlistComponent;
  let fixture: ComponentFixture<SkillWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillWishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
