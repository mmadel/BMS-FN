import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLinesComponent } from './find-lines.component';

describe('FindLinesComponent', () => {
  let component: FindLinesComponent;
  let fixture: ComponentFixture<FindLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
