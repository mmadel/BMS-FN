import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRuleComponent } from './modifier-rule.component';

describe('ModifierRuleComponent', () => {
  let component: ModifierRuleComponent;
  let fixture: ComponentFixture<ModifierRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
