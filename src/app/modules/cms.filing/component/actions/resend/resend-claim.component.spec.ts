import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendClaimComponent } from './resend-claim.component';

describe('ResendClaimComponent', () => {
  let component: ResendClaimComponent;
  let fixture: ComponentFixture<ResendClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResendClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
