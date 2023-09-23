import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardThreeComponent } from './product-card-three.component';

describe('ProductCardThreeComponent', () => {
  let component: ProductCardThreeComponent;
  let fixture: ComponentFixture<ProductCardThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
