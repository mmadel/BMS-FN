import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientCaseComponent } from './edit-patient-case.component';

describe('EditPatientCaseComponent', () => {
  let component: EditPatientCaseComponent;
  let fixture: ComponentFixture<EditPatientCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
