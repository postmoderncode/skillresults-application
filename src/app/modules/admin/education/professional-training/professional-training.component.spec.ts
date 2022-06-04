import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalTrainingComponent } from './professional-training.component';

describe('ProfessionalTrainingComponent', () => {
  let component: ProfessionalTrainingComponent;
  let fixture: ComponentFixture<ProfessionalTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
