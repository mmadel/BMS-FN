import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAuthsComponent } from './list-auths.component';

describe('ListAuthsComponent', () => {
  let component: ListAuthsComponent;
  let fixture: ComponentFixture<ListAuthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAuthsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAuthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
