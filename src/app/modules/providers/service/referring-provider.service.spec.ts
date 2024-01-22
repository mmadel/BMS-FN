import { TestBed } from '@angular/core/testing';

import { ReferringProviderService } from './referring-provider.service';

describe('ReferringProviderService', () => {
  let service: ReferringProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferringProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
