import { TestBed } from '@angular/core/testing';

import { LanguageconvertService } from './languageconvert.service';

describe('LanguageconvertService', () => {
  let service: LanguageconvertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageconvertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
