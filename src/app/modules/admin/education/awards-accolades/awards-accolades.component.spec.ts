import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsAccoladesComponent } from './awards-accolades.component';

describe('AwardsAccoladesComponent', () => {
  let component: AwardsAccoladesComponent;
  let fixture: ComponentFixture<AwardsAccoladesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardsAccoladesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsAccoladesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
