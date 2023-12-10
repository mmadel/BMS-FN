import { TestBed } from '@angular/core/testing';

import { InsuranceCompanyEmittingService } from './insurance-company-emitting.service';

describe('InsuranceCompanyEmittingService', () => {
  let service: InsuranceCompanyEmittingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCompanyEmittingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
