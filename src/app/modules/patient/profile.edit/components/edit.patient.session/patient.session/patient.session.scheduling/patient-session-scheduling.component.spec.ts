import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSessionSchedulingComponent } from './patient-session-scheduling.component';

describe('PatientSessionSchedulingComponent', () => {
  let component: PatientSessionSchedulingComponent;
  let fixture: ComponentFixture<PatientSessionSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSessionSchedulingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSessionSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
