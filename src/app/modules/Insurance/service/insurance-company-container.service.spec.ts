import { TestBed } from '@angular/core/testing';

import { InsuranceCompanyContainerService } from './insurance-company-container.service';

describe('InsuranceCompanyContainerService', () => {
  let service: InsuranceCompanyContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCompanyContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
