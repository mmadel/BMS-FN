import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListSettingsComponent } from './client-list-settings.component';

describe('ClientListSettingsComponent', () => {
  let component: ClientListSettingsComponent;
  let fixture: ComponentFixture<ClientListSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientListSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
