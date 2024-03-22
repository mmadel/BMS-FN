import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowActionsComponent } from './show-actions.component';

describe('ShowActionsComponent', () => {
  let component: ShowActionsComponent;
  let fixture: ComponentFixture<ShowActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
