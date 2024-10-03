import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClaimMessagesComponent } from './show-claim-messages.component';

describe('ShowClaimMessagesComponent', () => {
  let component: ShowClaimMessagesComponent;
  let fixture: ComponentFixture<ShowClaimMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowClaimMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowClaimMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
