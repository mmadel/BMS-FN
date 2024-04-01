import { TestBed } from '@angular/core/testing';

import { EnterPaymentService } from './enter-payment.service';

describe('EnterPaymentService', () => {
  let service: EnterPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
