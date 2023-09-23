import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalStoreComponent } from './personal-store.component';

describe('PersonalStoreComponent', () => {
  let component: PersonalStoreComponent;
  let fixture: ComponentFixture<PersonalStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
