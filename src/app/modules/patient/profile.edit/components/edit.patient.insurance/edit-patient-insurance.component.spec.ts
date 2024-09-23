import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientInsuranceComponent } from './edit-patient-insurance.component';

describe('EditPatientInsuranceComponent', () => {
  let component: EditPatientInsuranceComponent;
  let fixture: ComponentFixture<EditPatientInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
