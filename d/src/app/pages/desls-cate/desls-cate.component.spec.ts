import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeslsCateComponent } from './desls-cate.component';

describe('DeslsCateComponent', () => {
  let component: DeslsCateComponent;
  let fixture: ComponentFixture<DeslsCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeslsCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeslsCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
