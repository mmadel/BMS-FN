import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBalanceSettingsComponent } from './client-balance-settings.component';

describe('ClientBalanceSettingsComponent', () => {
  let component: ClientBalanceSettingsComponent;
  let fixture: ComponentFixture<ClientBalanceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBalanceSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBalanceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
