import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferringProviderListComponent } from './referring-provider-list.component';

describe('ReferringProviderListComponent', () => {
  let component: ReferringProviderListComponent;
  let fixture: ComponentFixture<ReferringProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferringProviderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferringProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
