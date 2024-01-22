import { TestBed } from '@angular/core/testing';

import { InsuranceCompanyConfigurationEmitterService } from './insurance-company-configuration-emitter.service';

describe('InsuranceCompanyConfigurationEmitterService', () => {
  let service: InsuranceCompanyConfigurationEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCompanyConfigurationEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
