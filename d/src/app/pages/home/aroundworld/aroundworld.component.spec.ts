import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AroundworldComponent } from './aroundworld.component';

describe('AroundworldComponent', () => {
  let component: AroundworldComponent;
  let fixture: ComponentFixture<AroundworldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AroundworldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AroundworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
