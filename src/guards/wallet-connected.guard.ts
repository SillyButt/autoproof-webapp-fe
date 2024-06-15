import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TonConnectService} from "../services/ton-connect.service";

export const walletConnectedGuard: CanActivateFn = async (route, state) => {
  const tonConnectService = inject(TonConnectService);
  const router = inject(Router);

  await tonConnectService.waitUntilConnected();
  console.log('tonConnectService.isWalletConnected()', tonConnectService.isWalletConnected());
  if (tonConnectService.isWalletConnected()) {
    return true;
  }
  
  const firstFlowUrl = router.parseUrl('/first-flow/select-file');
  return new RedirectCommand(firstFlowUrl)
};
