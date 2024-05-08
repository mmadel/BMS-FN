import { TestBed } from '@angular/core/testing';

import { RoleScopeFinderService } from './role-scope-finder.service';

describe('RoleScopeFinderService', () => {
  let service: RoleScopeFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleScopeFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
