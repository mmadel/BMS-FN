import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferringProviderCreateComponent } from './referring-provider-create.component';

describe('ReferringProviderCreateComponent', () => {
  let component: ReferringProviderCreateComponent;
  let fixture: ComponentFixture<ReferringProviderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferringProviderCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferringProviderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
