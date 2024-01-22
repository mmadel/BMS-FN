import { TestBed } from '@angular/core/testing';

import { EmitPatientSessionService } from './emit-patient-session.service';

describe('EmitPatientSessionService', () => {
  let service: EmitPatientSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitPatientSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
