import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulingComponent } from './sheduling.component';

describe('ShedulingComponent', () => {
  let component: ShedulingComponent;
  let fixture: ComponentFixture<ShedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedulingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
