import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsuccessComponent } from './productsuccess.component';

describe('ProductsuccessComponent', () => {
  let component: ProductsuccessComponent;
  let fixture: ComponentFixture<ProductsuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsuccessComponent]
    });
    fixture = TestBed.createComponent(ProductsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
