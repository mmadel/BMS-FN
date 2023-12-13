import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionItemEditComponent } from './session-item-edit.component';

describe('SessionItemEditComponent', () => {
  let component: SessionItemEditComponent;
  let fixture: ComponentFixture<SessionItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionItemEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
