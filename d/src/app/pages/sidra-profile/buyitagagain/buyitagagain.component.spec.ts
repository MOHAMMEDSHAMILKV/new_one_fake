import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyitagagainComponent } from './buyitagagain.component';

describe('BuyitagagainComponent', () => {
  let component: BuyitagagainComponent;
  let fixture: ComponentFixture<BuyitagagainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyitagagainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyitagagainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
