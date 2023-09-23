import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidraCartItemsComponent } from './sidra-cart-items.component';

describe('SidraCartItemsComponent', () => {
  let component: SidraCartItemsComponent;
  let fixture: ComponentFixture<SidraCartItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidraCartItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidraCartItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
