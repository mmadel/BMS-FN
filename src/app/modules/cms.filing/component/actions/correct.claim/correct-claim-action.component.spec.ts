import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectClaimActionComponent } from './correct-claim-action.component';

describe('CorrectClaimActionComponent', () => {
  let component: CorrectClaimActionComponent;
  let fixture: ComponentFixture<CorrectClaimActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectClaimActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectClaimActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
