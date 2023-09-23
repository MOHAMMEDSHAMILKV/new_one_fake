import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidraheaderComponent } from './sidraheader.component';

describe('SidraheaderComponent', () => {
  let component: SidraheaderComponent;
  let fixture: ComponentFixture<SidraheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidraheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidraheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
