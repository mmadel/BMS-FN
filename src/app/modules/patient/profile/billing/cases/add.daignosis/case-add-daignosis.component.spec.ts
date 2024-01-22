import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAddDaignosisComponent } from './case-add-daignosis.component';

describe('CaseAddDaignosisComponent', () => {
  let component: CaseAddDaignosisComponent;
  let fixture: ComponentFixture<CaseAddDaignosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseAddDaignosisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseAddDaignosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
