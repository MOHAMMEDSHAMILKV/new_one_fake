import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenaralpolicyComponent } from './genaralpolicy.component';

describe('GenaralpolicyComponent', () => {
  let component: GenaralpolicyComponent;
  let fixture: ComponentFixture<GenaralpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenaralpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenaralpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
