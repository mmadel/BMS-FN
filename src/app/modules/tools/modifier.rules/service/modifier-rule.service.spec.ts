import { TestBed } from '@angular/core/testing';

import { ModifierRuleService } from './modifier-rule.service';

describe('ModifierRuleService', () => {
  let service: ModifierRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifierRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
