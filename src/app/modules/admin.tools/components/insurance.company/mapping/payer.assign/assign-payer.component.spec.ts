import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPayerComponent } from './assign-payer.component';

describe('AssignPayerComponent', () => {
  let component: AssignPayerComponent;
  let fixture: ComponentFixture<AssignPayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
