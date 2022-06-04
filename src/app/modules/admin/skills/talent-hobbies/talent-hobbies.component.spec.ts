import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentHobbiesComponent } from './talent-hobbies.component';

describe('TalentHobbiesComponent', () => {
  let component: TalentHobbiesComponent;
  let fixture: ComponentFixture<TalentHobbiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentHobbiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentHobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
