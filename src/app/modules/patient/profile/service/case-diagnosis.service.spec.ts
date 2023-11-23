import { TestBed } from '@angular/core/testing';

import { CaseDiagnosisService } from './case-diagnosis.service';

describe('CaseDiagnosisService', () => {
  let service: CaseDiagnosisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseDiagnosisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
