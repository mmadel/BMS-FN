import { TestBed } from '@angular/core/testing';

import { BatchPaymentService } from './batch-payment.service';

describe('BatchPaymentService', () => {
  let service: BatchPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
