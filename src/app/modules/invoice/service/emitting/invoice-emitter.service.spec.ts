import { TestBed } from '@angular/core/testing';

import { InvoiceEmitterService } from './invoice-emitter.service';

describe('InvoiceEmitterService', () => {
  let service: InvoiceEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
