import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillBrowserComponent } from './skill-browser.component';

describe('SkillBrowserComponent', () => {
  let component: SkillBrowserComponent;
  let fixture: ComponentFixture<SkillBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
