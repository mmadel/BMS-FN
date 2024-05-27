import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInternalInsuranceComponent } from './edit-internal-insurance.component';

describe('EditInternalInsuranceComponent', () => {
  let component: EditInternalInsuranceComponent;
  let fixture: ComponentFixture<EditInternalInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInternalInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInternalInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
