import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSessionCreateComponent } from './patient-session-create.component';

describe('PatientSessionCreateComponent', () => {
  let component: PatientSessionCreateComponent;
  let fixture: ComponentFixture<PatientSessionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSessionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSessionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
