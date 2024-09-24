import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSessionCodingComponent } from './patient-session-coding.component';

describe('PatientSessionCodingComponent', () => {
  let component: PatientSessionCodingComponent;
  let fixture: ComponentFixture<PatientSessionCodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSessionCodingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSessionCodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
