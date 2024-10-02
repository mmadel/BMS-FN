import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientAuthorizationComponent } from './edit-patient-authorization.component';

describe('EditPatientAuthorizationComponent', () => {
  let component: EditPatientAuthorizationComponent;
  let fixture: ComponentFixture<EditPatientAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientAuthorizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
