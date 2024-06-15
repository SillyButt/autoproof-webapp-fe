import {Component, inject, OnInit} from '@angular/core';
import {
  TuiAvatarLabeledModule,
  TuiAvatarModule, TuiBadgeModule,
  TuiButtonModule,
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
  TuiTitleModule,
} from "@taiga-ui/experimental";
import {TuiDataListModule, TuiHostedDropdownModule, TuiLinkModule, TuiSvgModule} from "@taiga-ui/core";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TuiTabsModule} from "@taiga-ui/kit";
import {TelegramService} from "../../services/telegram.service";
import {TonConnectService} from "../../services/ton-connect.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TuiCardModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiButtonModule,
    RouterLink,
    TuiTabsModule,
    RouterOutlet, TuiAvatarLabeledModule, TuiAvatarModule, TuiBadgeModule, TuiHostedDropdownModule, TuiDataListModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
  
  activeTabIndex = 0;
  open = false;
  
  readonly walletAddress = inject(TonConnectService).tonConnectUI.wallet?.account.address;
  readonly shortWalletAddress = `${this.walletAddress?.slice(0, 3)}...${this.walletAddress?.slice(-3)}`;
  readonly telegramService = inject(TelegramService);
  
  readonly user = this.telegramService.user;
  
  constructor() {
    console.log('Telegram user', this.user);
  }
  
}
