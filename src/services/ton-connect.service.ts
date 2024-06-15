import { Injectable } from '@angular/core';
import {TonConnectUI} from "@tonconnect/ui";
import {Account} from "@tonconnect/sdk";

@Injectable({
  providedIn: 'root'
})
export class TonConnectService {

  readonly tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://loon-holy-noticeably.ngrok-free.app/tonconnect-manifest.json',
  });

  async waitUntilConnected(): Promise<void> {
    await this.tonConnectUI.connectionRestored;
  }

  isWalletConnected(): boolean {
    return this.tonConnectUI.connected;
  }
  
  get account(): Account | null {
    return this.tonConnectUI.account;
  }
  
}
