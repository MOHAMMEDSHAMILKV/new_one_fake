import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdrerdetailComponent } from './odrerdetail.component';

describe('OdrerdetailComponent', () => {
  let component: OdrerdetailComponent;
  let fixture: ComponentFixture<OdrerdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdrerdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdrerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
