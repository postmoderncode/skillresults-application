import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentsHobbiesComponent } from './talents-hobbies.component';

describe('TalentsHobbiesComponent', () => {
  let component: TalentsHobbiesComponent;
  let fixture: ComponentFixture<TalentsHobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentsHobbiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentsHobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
