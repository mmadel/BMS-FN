import { TestBed } from '@angular/core/testing';

import { RenderNavItemsService } from './render-nav-items.service';

describe('RenderNavItemsService', () => {
  let service: RenderNavItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderNavItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
