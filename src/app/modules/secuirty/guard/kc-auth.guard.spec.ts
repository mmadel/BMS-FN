import { TestBed } from '@angular/core/testing';

import { KcAuthGuard } from './kc-auth.guard';

describe('KcAuthGuard', () => {
  let guard: KcAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KcAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
