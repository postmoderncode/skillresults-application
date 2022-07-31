import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlCertsByOrgComponent } from './wl-certs-by-org.component';

describe('WlCertsByOrgComponent', () => {
  let component: WlCertsByOrgComponent;
  let fixture: ComponentFixture<WlCertsByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WlCertsByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WlCertsByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
