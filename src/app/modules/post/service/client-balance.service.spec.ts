import { TestBed } from '@angular/core/testing';

import { ClientBalanceService } from './client-balance.service';

describe('ClientBalanceService', () => {
  let service: ClientBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
