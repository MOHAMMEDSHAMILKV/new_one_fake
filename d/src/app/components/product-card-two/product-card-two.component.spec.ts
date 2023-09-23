import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardTwoComponent } from './product-card-two.component';

describe('ProductCardTwoComponent', () => {
  let component: ProductCardTwoComponent;
  let fixture: ComponentFixture<ProductCardTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
