import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchClientPaymentComponent } from './batch-client-payment.component';

describe('BatchClientPaymentComponent', () => {
  let component: BatchClientPaymentComponent;
  let fixture: ComponentFixture<BatchClientPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchClientPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchClientPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
