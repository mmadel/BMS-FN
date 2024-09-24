import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSessionBillingComponent } from './patient-session-billing.component';

describe('PatientSessionBillingComponent', () => {
  let component: PatientSessionBillingComponent;
  let fixture: ComponentFixture<PatientSessionBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSessionBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSessionBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
