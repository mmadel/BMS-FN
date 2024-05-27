import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingRoleComponent } from './billing-role.component';

describe('BillingRoleComponent', () => {
  let component: BillingRoleComponent;
  let fixture: ComponentFixture<BillingRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
