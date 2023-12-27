import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaignosisCreationComponent } from './daignosis-creation.component';

describe('DaignosisCreationComponent', () => {
  let component: DaignosisCreationComponent;
  let fixture: ComponentFixture<DaignosisCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaignosisCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaignosisCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
