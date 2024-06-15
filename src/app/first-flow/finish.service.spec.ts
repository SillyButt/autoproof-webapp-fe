import { TestBed } from '@angular/core/testing';

import { FinishService } from './finish.service';

describe('FinishService', () => {
  let service: FinishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
