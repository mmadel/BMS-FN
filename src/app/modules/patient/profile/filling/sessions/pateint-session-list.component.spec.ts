import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PateintSessionListComponent } from './pateint-session-list.component';

describe('PateintSessionListComponent', () => {
  let component: PateintSessionListComponent;
  let fixture: ComponentFixture<PateintSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PateintSessionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PateintSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
