import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DignosisListComponent } from './dignosis-list.component';

describe('DignosisListComponent', () => {
  let component: DignosisListComponent;
  let fixture: ComponentFixture<DignosisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DignosisListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DignosisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
