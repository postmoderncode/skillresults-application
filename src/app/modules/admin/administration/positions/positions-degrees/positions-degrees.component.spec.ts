import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsDegreesComponent } from './positions-degrees.component';

describe('PositionsDegreesComponent', () => {
  let component: PositionsDegreesComponent;
  let fixture: ComponentFixture<PositionsDegreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionsDegreesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
