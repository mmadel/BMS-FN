import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCompanyPaymentComponent } from './insurance-company-payment.component';

describe('InsuranceCompanyPaymentComponent', () => {
  let component: InsuranceCompanyPaymentComponent;
  let fixture: ComponentFixture<InsuranceCompanyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceCompanyPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceCompanyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
