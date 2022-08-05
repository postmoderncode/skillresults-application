import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsSkillsComponent } from './positions-skills.component';

describe('PositionsSkillsComponent', () => {
  let component: PositionsSkillsComponent;
  let fixture: ComponentFixture<PositionsSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionsSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
