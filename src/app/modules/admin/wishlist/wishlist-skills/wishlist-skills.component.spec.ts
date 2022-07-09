import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistSkillsComponent } from './wishlist-skills.component';

describe('WishlistSkillsComponent', () => {
  let component: WishlistSkillsComponent;
  let fixture: ComponentFixture<WishlistSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
