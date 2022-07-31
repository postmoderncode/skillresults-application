import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReportsComponent } from './public-reports.component';

describe('PublicReportsComponent', () => {
  let component: PublicReportsComponent;
  let fixture: ComponentFixture<PublicReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
