import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Box33SettingsComponent } from './box33-settings.component';

describe('Box33SettingsComponent', () => {
  let component: Box33SettingsComponent;
  let fixture: ComponentFixture<Box33SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Box33SettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Box33SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
