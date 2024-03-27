import { TestBed } from '@angular/core/testing';

import { FeeScheduleService } from './fee-schedule.service';

describe('FeeScheduleService', () => {
  let service: FeeScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
