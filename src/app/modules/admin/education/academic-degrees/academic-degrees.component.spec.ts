import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicDegreesComponent } from './academic-degrees.component';

describe('AcademicDegreesComponent', () => {
  let component: AcademicDegreesComponent;
  let fixture: ComponentFixture<AcademicDegreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicDegreesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
