import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlDegreesByOrgComponent } from './wl-degrees-by-org.component';

describe('WlDegreesByOrgComponent', () => {
  let component: WlDegreesByOrgComponent;
  let fixture: ComponentFixture<WlDegreesByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WlDegreesByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WlDegreesByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
