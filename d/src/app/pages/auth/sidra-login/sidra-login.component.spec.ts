import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidraLoginComponent } from './sidra-login.component';

describe('SidraLoginComponent', () => {
  let component: SidraLoginComponent;
  let fixture: ComponentFixture<SidraLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidraLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidraLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
