import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceSettingsModalComponent } from './insurance-settings-modal.component';

describe('InsuranceSettingsModalComponent', () => {
  let component: InsuranceSettingsModalComponent;
  let fixture: ComponentFixture<InsuranceSettingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceSettingsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
