import {Inject, inject, Injectable} from '@angular/core';
import {UserDto} from "../../interfaces/user.interface";
import {SnapshotDto} from "../../interfaces/snapshot.interface";
import {catchError, EMPTY, filter, from, map, Observable, switchMap, tap, throwError} from "rxjs";
import FirstFlowService from "../../services/first-flow.service";
import {TonConnectService} from "../../services/ton-connect.service";
import {TelegramService} from "../../services/telegram.service";
import {BackendApiService} from "../../services/backend-api.service";
import {SnapshotService} from "../../services/snapshot.service";
import { TuiAlertService } from '@taiga-ui/core';

export interface FirstFlowData {
  files: File[];
  description: string;
  name: string;
  address: string;
  agreeWithTerms: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FinishService {

  private readonly firstFlowService = inject(FirstFlowService);
  private readonly telegramService = inject(TelegramService);
  private readonly backendApiService = inject(BackendApiService);
  private readonly snapshotService = inject(SnapshotService);
  private readonly tonConnectService = inject(TonConnectService);
  
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}
  
  createUserAndSnapshot(): Observable<void> {
    const walletAddress = this.tonConnectService.account?.address;
    if (!walletAddress) throw new Error("Wallet address is not defined");
    
    const user: UserDto = {
      telegram_id: this.telegramService.user.id,
      name: this.firstFlowService.data.name,
      address: this.firstFlowService.data.address,
      wallet_address: walletAddress,
    };
    
    return this.backendApiService.createUser(user).pipe(
      filter((response) => {
        if (!response.result) {
          this.alerts.open('Failed to create a user', { status: 'error'});
          return false;
        }

        return true;
      }),
      tap((response) => {
        const token = response.user_api_key;
        localStorage.setItem('app-token', token);
      }),
      switchMap(() => {
        const data = this.firstFlowService.data;
        const file = data.files[0];
        
        return from(this.snapshotService.createHash(file)).pipe(
          map((hash) => ({
            description: data.description,
            mode: 'live',
            data: [{ filename: file.name, hash: `keccak256:${hash}` }],
          })),
          catchError((error) => {
            this.alerts.open('Failed to create hash', { status: 'error'});
            return EMPTY;
          })
        );
      }),
      switchMap((snapshot: SnapshotDto) => this.backendApiService.uploadSnapshot(snapshot).pipe(
        map((result) => {
          if (!result.result) return throwError(() => 'Failed to upload snapshot');
          return result;
        }),
        catchError((error) => {
          this.alerts.open('Failed to upload snapshot', { status: 'error'});
          return EMPTY;
        })
      )),
      map(() => undefined)
    );
  }

}
