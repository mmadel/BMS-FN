import { TestBed } from '@angular/core/testing';

import { PostingEmitterService } from './posting-emitter.service';

describe('PostingEmitterService', () => {
  let service: PostingEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostingEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
