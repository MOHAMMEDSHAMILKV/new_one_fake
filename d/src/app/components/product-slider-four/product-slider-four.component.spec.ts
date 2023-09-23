import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderFourComponent } from './product-slider-four.component';

describe('ProductSliderFourComponent', () => {
  let component: ProductSliderFourComponent;
  let fixture: ComponentFixture<ProductSliderFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSliderFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSliderFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
