import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidraProfileComponent } from './sidra-profile.component';

describe('SidraProfileComponent', () => {
  let component: SidraProfileComponent;
  let fixture: ComponentFixture<SidraProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidraProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidraProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
