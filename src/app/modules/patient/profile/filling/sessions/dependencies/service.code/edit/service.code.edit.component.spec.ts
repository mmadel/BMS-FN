import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCodeEditComponent } from './service.code.edit.component';

describe('ServiceCodeEditComponent', () => {
  let component: ServiceCodeEditComponent;
  let fixture: ComponentFixture<ServiceCodeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCodeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
