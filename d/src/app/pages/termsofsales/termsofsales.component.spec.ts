import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofsalesComponent } from './termsofsales.component';

describe('TermsofsalesComponent', () => {
  let component: TermsofsalesComponent;
  let fixture: ComponentFixture<TermsofsalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsofsalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
