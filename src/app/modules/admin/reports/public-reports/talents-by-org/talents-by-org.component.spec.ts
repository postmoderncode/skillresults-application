import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentsByOrgComponent } from './talents-by-org.component';

describe('TalentsByOrgComponent', () => {
  let component: TalentsByOrgComponent;
  let fixture: ComponentFixture<TalentsByOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentsByOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentsByOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
