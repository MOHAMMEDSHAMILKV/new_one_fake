import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCardOneComponent } from './deal-card-one.component';

describe('DealCardOneComponent', () => {
  let component: DealCardOneComponent;
  let fixture: ComponentFixture<DealCardOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealCardOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCardOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
