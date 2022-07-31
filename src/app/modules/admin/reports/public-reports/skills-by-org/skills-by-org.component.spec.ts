import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsByOrgComponent } from './skills-by-org.component';

describe('SkillsByOrgComponent', () => {
  let component: SkillsByOrgComponent;
  let fixture: ComponentFixture<SkillsByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
