import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationsLicensesComponent } from './certifications-licenses.component';

describe('CertificationsLicensesComponent', () => {
  let component: CertificationsLicensesComponent;
  let fixture: ComponentFixture<CertificationsLicensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationsLicensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationsLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
