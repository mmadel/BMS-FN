import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorLayoutComponent } from './simulator-layout.component';

describe('SimulatorLayoutComponent', () => {
  let component: SimulatorLayoutComponent;
  let fixture: ComponentFixture<SimulatorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
