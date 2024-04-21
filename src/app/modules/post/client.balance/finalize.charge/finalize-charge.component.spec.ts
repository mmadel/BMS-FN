import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeChargeComponent } from './finalize-charge.component';

describe('FinalizeChargeComponent', () => {
  let component: FinalizeChargeComponent;
  let fixture: ComponentFixture<FinalizeChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizeChargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizeChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
