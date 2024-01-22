import { TestBed } from '@angular/core/testing';

import { InsuranceCompanyConfigurationService } from './insurance-company-configuration.service';

describe('InsuranceCompanyConfigurationService', () => {
  let service: InsuranceCompanyConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCompanyConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
