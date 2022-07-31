import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlSkillsByOrgComponent } from './wl-skills-by-org.component';

describe('WlSkillsByOrgComponent', () => {
  let component: WlSkillsByOrgComponent;
  let fixture: ComponentFixture<WlSkillsByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WlSkillsByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WlSkillsByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
