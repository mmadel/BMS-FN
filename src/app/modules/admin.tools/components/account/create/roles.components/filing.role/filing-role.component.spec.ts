import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingRoleComponent } from './filing-role.component';

describe('FilingRoleComponent', () => {
  let component: FilingRoleComponent;
  let fixture: ComponentFixture<FilingRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilingRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilingRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
