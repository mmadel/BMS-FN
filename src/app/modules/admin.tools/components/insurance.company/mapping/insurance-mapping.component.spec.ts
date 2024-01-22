import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceMappingComponent } from './insurance-mapping.component';

describe('InsuranceMappingComponent', () => {
  let component: InsuranceMappingComponent;
  let fixture: ComponentFixture<InsuranceMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
