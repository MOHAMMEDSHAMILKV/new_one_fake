import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewlistpageComponent } from './reviewlistpage.component';

describe('ReviewlistpageComponent', () => {
  let component: ReviewlistpageComponent;
  let fixture: ComponentFixture<ReviewlistpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewlistpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewlistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
