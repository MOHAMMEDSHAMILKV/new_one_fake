import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnrefundComponent } from './returnrefund.component';

describe('ReturnrefundComponent', () => {
  let component: ReturnrefundComponent;
  let fixture: ComponentFixture<ReturnrefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnrefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnrefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
