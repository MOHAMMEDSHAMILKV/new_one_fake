import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSliderThreeComponent } from './product-slider-three.component';

describe('ProductSliderThreeComponent', () => {
  let component: ProductSliderThreeComponent;
  let fixture: ComponentFixture<ProductSliderThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSliderThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSliderThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
