import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCodeListComponent } from './service.code.list.component';

describe('ServiceCodeListComponent', () => {
  let component: ServiceCodeListComponent;
  let fixture: ComponentFixture<ServiceCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCodeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
