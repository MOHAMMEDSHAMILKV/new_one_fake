import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdealsComponent } from './getdeals.component';

describe('GetdealsComponent', () => {
  let component: GetdealsComponent;
  let fixture: ComponentFixture<GetdealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetdealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
