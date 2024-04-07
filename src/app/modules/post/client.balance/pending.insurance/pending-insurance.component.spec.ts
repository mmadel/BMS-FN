import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInsuranceComponent } from './pending-insurance.component';

describe('PendingInsuranceComponent', () => {
  let component: PendingInsuranceComponent;
  let fixture: ComponentFixture<PendingInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
