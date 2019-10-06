import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token.interceptor';

describe('TokenInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenInterceptorService = TestBed.get(TokenInterceptorService);
    expect(service).toBeTruthy();
  });
});
