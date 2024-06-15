import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { walletNotConnectedGuard } from './wallet-not-connected.guard';

describe('walletNotConnectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => walletNotConnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
