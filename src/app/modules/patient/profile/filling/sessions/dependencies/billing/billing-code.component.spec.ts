import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCodeComponent } from './billing-code.component';

describe('BillingCodeComponent', () => {
  let component: BillingCodeComponent;
  let fixture: ComponentFixture<BillingCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
