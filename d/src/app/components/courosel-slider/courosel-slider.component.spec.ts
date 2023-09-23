import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouroselSliderComponent } from './courosel-slider.component';

describe('CouroselSliderComponent', () => {
  let component: CouroselSliderComponent;
  let fixture: ComponentFixture<CouroselSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouroselSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouroselSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
