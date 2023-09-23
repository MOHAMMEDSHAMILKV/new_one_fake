import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSliderComponent } from './branch-slider.component';

describe('BranchSliderComponent', () => {
  let component: BranchSliderComponent;
  let fixture: ComponentFixture<BranchSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
