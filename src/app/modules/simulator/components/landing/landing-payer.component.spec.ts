import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPayerComponent } from './landing-payer.component';

describe('LandingPayerComponent', () => {
  let component: LandingPayerComponent;
  let fixture: ComponentFixture<LandingPayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
