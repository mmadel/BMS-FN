import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicRemittanceAdviceComponent } from './electronic-remittance-advice.component';

describe('ElectronicRemittanceAdviceComponent', () => {
  let component: ElectronicRemittanceAdviceComponent;
  let fixture: ComponentFixture<ElectronicRemittanceAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicRemittanceAdviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectronicRemittanceAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
