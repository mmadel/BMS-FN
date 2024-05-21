import { TestBed } from '@angular/core/testing';

import { RoleEmitingService } from './role-emiting.service';

describe('RoleEmitingService', () => {
  let service: RoleEmitingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleEmitingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
