import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReferringProviderComponent } from './view-referring-provider.component';

describe('ViewReferringProviderComponent', () => {
  let component: ViewReferringProviderComponent;
  let fixture: ComponentFixture<ViewReferringProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReferringProviderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReferringProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
