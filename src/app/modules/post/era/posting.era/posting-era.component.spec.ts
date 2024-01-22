import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingERAComponent } from './posting-era.component';

describe('PostingERAComponent', () => {
  let component: PostingERAComponent;
  let fixture: ComponentFixture<PostingERAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostingERAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostingERAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
