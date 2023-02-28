import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelClaimComponent } from './cancel-claim.component';

describe('CancelClaimComponent', () => {
  let component: CancelClaimComponent;
  let fixture: ComponentFixture<CancelClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
