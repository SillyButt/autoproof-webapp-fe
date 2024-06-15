import {Component, inject} from '@angular/core';
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {TelegramService} from "../../../services/telegram.service";
import {TuiBadgeModule, TuiButtonModule} from "@taiga-ui/experimental";

@Component({
  selector: 'app-referrals',
  standalone: true,
  imports: [
    CdkCopyToClipboard,
    TuiButtonModule,
    TuiBadgeModule
  ],
  templateUrl: './referrals.component.html',
  styleUrl: './referrals.component.scss'
})
export class ReferralsComponent {
  
  readonly referralLink = `https://t.me/autoproof/start?startapp=buddyId=${inject(TelegramService)?.user?.id}`

  async share(): Promise<void> {
    await navigator.share({
      title: 'Autoproof',
      text: 'Check out this example page!',
      url: this.referralLink,
    });
  }
}
