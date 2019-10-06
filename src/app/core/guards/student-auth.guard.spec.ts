import { TestBed, async, inject } from '@angular/core/testing';

import { StudentAuthGuard } from './student-auth.guard';

describe('StudentAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentAuthGuard]
    });
  });
});
