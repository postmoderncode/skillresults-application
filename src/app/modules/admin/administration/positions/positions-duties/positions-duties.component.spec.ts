import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsDutiesComponent } from './positions-duties.component';

describe('PositionsDutiesComponent', () => {
  let component: PositionsDutiesComponent;
  let fixture: ComponentFixture<PositionsDutiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionsDutiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsDutiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
