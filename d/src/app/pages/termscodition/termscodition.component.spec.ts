import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermscoditionComponent } from './termscodition.component';

describe('TermscoditionComponent', () => {
  let component: TermscoditionComponent;
  let fixture: ComponentFixture<TermscoditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermscoditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermscoditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
