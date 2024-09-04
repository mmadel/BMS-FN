import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraDetailsComponent } from './era-details.component';

describe('EraDetailsComponent', () => {
  let component: EraDetailsComponent;
  let fixture: ComponentFixture<EraDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EraDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EraDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
