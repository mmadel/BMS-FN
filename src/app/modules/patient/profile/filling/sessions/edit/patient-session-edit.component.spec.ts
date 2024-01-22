import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSessionEditComponent } from './patient-session-edit.component';

describe('PatientSessionEditComponent', () => {
  let component: PatientSessionEditComponent;
  let fixture: ComponentFixture<PatientSessionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSessionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
