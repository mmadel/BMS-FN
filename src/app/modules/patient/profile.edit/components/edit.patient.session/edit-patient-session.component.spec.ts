import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientSessionComponent } from './edit-patient-session.component';

describe('EditPatientSessionComponent', () => {
  let component: EditPatientSessionComponent;
  let fixture: ComponentFixture<EditPatientSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
