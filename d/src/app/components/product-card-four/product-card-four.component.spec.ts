import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardFourComponent } from './product-card-four.component';

describe('ProductCardFourComponent', () => {
  let component: ProductCardFourComponent;
  let fixture: ComponentFixture<ProductCardFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
