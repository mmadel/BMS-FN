import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRoleComponent } from './provider-role.component';

describe('ProviderRoleComponent', () => {
  let component: ProviderRoleComponent;
  let fixture: ComponentFixture<ProviderRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
