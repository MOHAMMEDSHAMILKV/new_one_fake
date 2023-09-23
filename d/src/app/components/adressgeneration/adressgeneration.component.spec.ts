import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressgenerationComponent } from './adressgeneration.component';

describe('AdressgenerationComponent', () => {
  let component: AdressgenerationComponent;
  let fixture: ComponentFixture<AdressgenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressgenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
