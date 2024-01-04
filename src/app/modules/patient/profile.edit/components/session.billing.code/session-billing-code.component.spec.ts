import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionBillingCodeComponent } from './session-billing-code.component';

describe('SessionBillingCodeComponent', () => {
  let component: SessionBillingCodeComponent;
  let fixture: ComponentFixture<SessionBillingCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionBillingCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionBillingCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
