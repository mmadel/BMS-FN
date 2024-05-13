import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentRoleComponent } from './payment-role.component';

describe('PaymentRoleComponent', () => {
  let component: PaymentRoleComponent;
  let fixture: ComponentFixture<PaymentRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
