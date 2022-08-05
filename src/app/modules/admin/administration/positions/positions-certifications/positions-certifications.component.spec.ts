import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsCertificationsComponent } from './positions-certifications.component';

describe('PositionsCertificationsComponent', () => {
  let component: PositionsCertificationsComponent;
  let fixture: ComponentFixture<PositionsCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionsCertificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
