import { TestBed } from '@angular/core/testing';

import { TonConnectService } from './ton-connect.service';

describe('TonConnectService', () => {
  let service: TonConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TonConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
