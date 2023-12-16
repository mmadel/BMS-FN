import { TestBed } from '@angular/core/testing';

import { PostingServiceService } from './posting-service.service';

describe('PostingServiceService', () => {
  let service: PostingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
