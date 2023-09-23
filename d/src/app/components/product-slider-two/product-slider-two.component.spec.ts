import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderTwoComponent } from './product-slider-two.component';

describe('ProductSliderTwoComponent', () => {
  let component: ProductSliderTwoComponent;
  let fixture: ComponentFixture<ProductSliderTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSliderTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSliderTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
