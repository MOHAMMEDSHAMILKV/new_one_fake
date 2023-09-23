import { TestBed } from '@angular/core/testing';

import { RatingreviewService } from './ratingreview.service';

describe('RatingreviewService', () => {
  let service: RatingreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
