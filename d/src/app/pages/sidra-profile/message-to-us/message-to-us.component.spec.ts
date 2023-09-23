import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageToUsComponent } from './message-to-us.component';

describe('MessageToUsComponent', () => {
  let component: MessageToUsComponent;
  let fixture: ComponentFixture<MessageToUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageToUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageToUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
