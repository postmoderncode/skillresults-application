import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertsByOrgComponent } from './certs-by-org.component';

describe('CertsByOrgComponent', () => {
  let component: CertsByOrgComponent;
  let fixture: ComponentFixture<CertsByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertsByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertsByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
