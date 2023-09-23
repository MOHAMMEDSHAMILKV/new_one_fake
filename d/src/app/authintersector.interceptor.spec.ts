import { TestBed } from '@angular/core/testing';

import { AuthintersectorInterceptor } from './authintersector.interceptor';

describe('AuthintersectorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthintersectorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthintersectorInterceptor = TestBed.inject(AuthintersectorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
