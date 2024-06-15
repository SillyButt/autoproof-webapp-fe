import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  
  initialize(): void {
    (window as any).Telegram?.WebApp.ready();
    (window as any).Telegram?.WebApp.expand();
    (window as any).Telegram?.WebApp.enableClosingConfirmation();
  }
  
  get user(): any {
    return (window as any).Telegram?.WebApp.initDataUnsafe.user;
  }

}
