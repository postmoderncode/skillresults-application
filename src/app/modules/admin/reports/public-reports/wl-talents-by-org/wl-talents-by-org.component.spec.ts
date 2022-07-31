import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlTalentsByOrgComponent } from './wl-talents-by-org.component';

describe('WlTalentsByOrgComponent', () => {
  let component: WlTalentsByOrgComponent;
  let fixture: ComponentFixture<WlTalentsByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WlTalentsByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WlTalentsByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
