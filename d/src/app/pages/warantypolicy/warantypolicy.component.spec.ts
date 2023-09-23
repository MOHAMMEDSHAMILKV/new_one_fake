import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarantypolicyComponent } from './warantypolicy.component';

describe('WarantypolicyComponent', () => {
  let component: WarantypolicyComponent;
  let fixture: ComponentFixture<WarantypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarantypolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarantypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
