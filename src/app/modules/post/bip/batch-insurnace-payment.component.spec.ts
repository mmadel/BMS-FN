import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchInsurnacePaymentComponent } from './batch-insurnace-payment.component';

describe('BatchInsurnacePaymentComponent', () => {
  let component: BatchInsurnacePaymentComponent;
  let fixture: ComponentFixture<BatchInsurnacePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchInsurnacePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchInsurnacePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
