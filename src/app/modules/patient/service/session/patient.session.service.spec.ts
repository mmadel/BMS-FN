import { TestBed } from '@angular/core/testing';

import { PatientSessionService } from './patient.session.service';

describe('PatientSessionService', () => {
  let service: PatientSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
