import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeeScheduleComponent } from './create-fee-schedule.component';

describe('CreateFeeScheduleComponent', () => {
  let component: CreateFeeScheduleComponent;
  let fixture: ComponentFixture<CreateFeeScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFeeScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFeeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
