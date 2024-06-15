import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TonConnectService} from "../services/ton-connect.service";

export const walletNotConnectedGuard: CanActivateFn = async (route, state) => {
  const tonConnectService = inject(TonConnectService);
  const router = inject(Router);
  
  await tonConnectService.waitUntilConnected();

  const isConnected = tonConnectService.isWalletConnected();
  if (!isConnected) return true;
  
  const dashboardUrl = router.parseUrl('/dashboard');
  return new RedirectCommand(dashboardUrl, { skipLocationChange: true })
};
