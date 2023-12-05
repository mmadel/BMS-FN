import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCodeCreateComponent } from './service.code.create.component';

describe('ServiceCodeCreateComponent', () => {
  let component: ServiceCodeCreateComponent;
  let fixture: ComponentFixture<ServiceCodeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCodeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
