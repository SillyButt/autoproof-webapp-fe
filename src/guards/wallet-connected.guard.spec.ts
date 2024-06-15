import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { walletConnectedGuard } from './wallet-connected.guard';

describe('walletConnectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => walletConnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
