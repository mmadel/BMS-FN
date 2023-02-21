import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingAreaComponent } from './invoicing-area.component';

describe('InvoicingAreaComponent', () => {
  let component: InvoicingAreaComponent;
  let fixture: ComponentFixture<InvoicingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicingAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
