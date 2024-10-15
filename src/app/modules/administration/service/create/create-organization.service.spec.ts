import { TestBed } from '@angular/core/testing';

import { CreateOrganizationService } from './create-organization.service';

describe('CreateOrganizationService', () => {
  let service: CreateOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
