import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.guard';

describe('AdminAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuard]
    });
  });
});
