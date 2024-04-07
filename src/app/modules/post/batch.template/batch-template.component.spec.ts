import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchTemplateComponent } from './batch-template.component';

describe('BatchTemplateComponent', () => {
  let component: BatchTemplateComponent;
  let fixture: ComponentFixture<BatchTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
