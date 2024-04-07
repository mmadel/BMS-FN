import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBalanceComponent } from './client-balance.component';

describe('ClientBalanceComponent', () => {
  let component: ClientBalanceComponent;
  let fixture: ComponentFixture<ClientBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
