import { TestBed } from '@angular/core/testing';

import { PateintEmittingService } from './pateint-emitting.service';

describe('PateintEmittingService', () => {
  let service: PateintEmittingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PateintEmittingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
