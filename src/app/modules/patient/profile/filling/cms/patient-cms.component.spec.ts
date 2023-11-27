import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCmsComponent } from './patient-cms.component';

describe('PatientCmsComponent', () => {
  let component: PatientCmsComponent;
  let fixture: ComponentFixture<PatientCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
