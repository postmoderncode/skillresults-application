import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreesByOrgComponent } from './degrees-by-org.component';

describe('DegreesByOrgComponent', () => {
  let component: DegreesByOrgComponent;
  let fixture: ComponentFixture<DegreesByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreesByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreesByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
