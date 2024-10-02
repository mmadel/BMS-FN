import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientProfileDialogComponent } from './patient-profile-dialog.component';

describe('PatientProfileDialogComponent', () => {
  let component: PatientProfileDialogComponent;
  let fixture: ComponentFixture<PatientProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientProfileDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
