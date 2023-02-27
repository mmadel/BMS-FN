import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceSessionListComponent } from './insurance-session-list.component';

describe('InsuranceSessionListComponent', () => {
  let component: InsuranceSessionListComponent;
  let fixture: ComponentFixture<InsuranceSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceSessionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
