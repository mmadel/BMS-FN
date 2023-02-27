import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingLinesComponent } from './posting-lines.component';

describe('PostingLinesComponent', () => {
  let component: PostingLinesComponent;
  let fixture: ComponentFixture<PostingLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostingLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostingLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
