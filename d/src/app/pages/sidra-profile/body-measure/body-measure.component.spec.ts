import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyMeasureComponent } from './body-measure.component';

describe('BodyMeasureComponent', () => {
  let component: BodyMeasureComponent;
  let fixture: ComponentFixture<BodyMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
