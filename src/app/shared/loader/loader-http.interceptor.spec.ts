import { TestBed } from '@angular/core/testing';

import { LoaderHttpInterceptor } from './loader-http.interceptor';

describe('LoaderHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoaderHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoaderHttpInterceptor = TestBed.inject(LoaderHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
