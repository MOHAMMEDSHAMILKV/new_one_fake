import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBannerComponent } from './branch-banner.component';

describe('BranchBannerComponent', () => {
  let component: BranchBannerComponent;
  let fixture: ComponentFixture<BranchBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
