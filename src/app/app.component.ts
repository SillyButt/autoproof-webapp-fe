import { TuiRootModule, TuiDialogModule, TuiAlertModule } from "@taiga-ui/core";
import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TelegramService} from "../services/telegram.service";
import {environment} from "../environments/environment";
import eruda from "eruda";
import {TonConnectService} from "../services/ton-connect.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  private telegramService = inject(TelegramService);
  private tonConnectService = inject(TonConnectService);
  
  readonly loading = signal<boolean>(true);

  constructor() {
    this.telegramService.initialize();
    
    if (!environment.production) {
      eruda.init();
    }
    
    console.log('Telegram user', (window as any).Telegram?.WebApp.initDataUnsafe);
    this.subToTonConnect();
    
    (window as any).connectTon = () => {
      this.tonConnectService.tonConnectUI.openModal();
      
      this.tonConnectService.tonConnectUI.onStatusChange(async (wallet) => {
        console.log("Connected wallet:", wallet);
      });
    }
  }
  
  private async subToTonConnect(): Promise<void> {
    await this.tonConnectService.tonConnectUI.connectionRestored;
    console.log('Restored connection');
    console.log('Connected? Wallet?', this.tonConnectService.tonConnectUI.connected, this.tonConnectService.tonConnectUI.wallet);
  }
}
