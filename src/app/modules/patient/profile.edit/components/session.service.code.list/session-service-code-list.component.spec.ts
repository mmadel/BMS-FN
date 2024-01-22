import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionServiceCodeListComponent } from './session-service-code-list.component';

describe('SessionServiceCodeListComponent', () => {
  let component: SessionServiceCodeListComponent;
  let fixture: ComponentFixture<SessionServiceCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionServiceCodeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionServiceCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
