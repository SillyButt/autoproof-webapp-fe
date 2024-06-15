import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {SnapshotResult} from "../../../interfaces/snapshot.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BackendApiService} from "../../../services/backend-api.service";
import {
  TuiAppearanceModule, TuiBadgeModule,
  TuiButtonModule,
  TuiCardModule,
  TuiHeaderModule,
  TuiSurfaceModule,
  TuiTitleModule
} from "@taiga-ui/experimental";
import {Router, RouterLink} from "@angular/router";
import {TelegramService} from "../../../services/telegram.service";
import {catchError, firstValueFrom, interval, Subject, switchMap, take, takeUntil, takeWhile} from "rxjs";
import {environment} from "../../../environments/environment";
import {TonConnectService} from "../../../services/ton-connect.service";
import {SendTransactionResponse} from "@tonconnect/sdk";
import {TuiAlertService, TuiLoaderModule} from "@taiga-ui/core";
import {tuiIconFile} from "@taiga-ui/icons";

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [
    TuiButtonModule,
    RouterLink,
    TuiHeaderModule,
    TuiCardModule,
    TuiSurfaceModule,
    TuiTitleModule,
    TuiAppearanceModule,
    TuiLoaderModule,
    TuiBadgeModule,
  ],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent implements OnInit {
  
  private telegramService = inject(TelegramService);
  private readonly router = inject(Router);
  private readonly alertService = inject(TuiAlertService);
  private readonly backendApiService = inject(BackendApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly tonConnectService = inject(TonConnectService);
  
  readonly snapshots = signal<SnapshotResult[]>([]);
  readonly loading = signal<boolean>(true);
  readonly certificateLoading = signal<string[]>([]);
  
  ngOnInit(): void {
    // this.startPolling();
    
    // effect(() => {
    //   const snapshots = this.snapshots();
    //   if (!snapshots.length) return;
    //
    //   const hasUndoneSnapshots = snapshots.some(snap => snap.status !== 'done');
    //   if (!hasUndoneSnapshots) return;
    //
    this.backendApiService.getSnapshots().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((snapshots) => {
      this.snapshots.set(snapshots);
      this.loading.set(false);
    });
  }
  
  openCertificate(snapshot: SnapshotResult): void {
    window.open(`https://test.autoproof.dev/certificate/${snapshot.link_id}`, '_blank');
  }
  
  async createCertificate(snapshot: SnapshotResult): Promise<void> {
    const destinationAddress = environment.companyWalletAddress;
    const paymentAmount = '50000000';
    
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 180, // 3min
      messages: [
        {
          address: destinationAddress,
          amount: paymentAmount,
        }
      ]
    };
    
    this.certificateLoading.set([...this.certificateLoading(), snapshot.id]);
    
    let transactionResult: SendTransactionResponse;
    try {
      transactionResult = await this.tonConnectService.tonConnectUI.sendTransaction(transaction);
      console.log('transactionResult', transactionResult);
    } catch (error) {
      this.alertService.open('Could not send transaction', { status: 'error' });
      console.error(error);
      this.certificateLoading.set([...this.certificateLoading().filter(id => id !== snapshot.id)]);
      return;
    }

    let appendTransactionResult
    try {
      appendTransactionResult = await firstValueFrom(this.backendApiService.appendTransactionIdToSnapshot(snapshot.id, 'transactionId'));
      console.log('appendTransactionResult', appendTransactionResult);
    } catch (error) {
      this.alertService.open('Could append transaction to snapshot', { status: 'error' });
      console.error(error);
      this.certificateLoading.set([...this.certificateLoading().filter(id => id !== snapshot.id)]);
      return;
    }
    
    this.startPolling(snapshot.id);
    
    // setTimeout(() => {
    //   const currentSnapshot = this.snapshots();
    //   this.certificateLoading.set(false);
    //   this.snapshots.set([{ ...currentSnapshot[0], status: 'done' }]);
    //   this.loading.set(false);
    // }, 4000);
  }
  
  private startPolling(snapshotId: string): void {
    // setTimeout(() => {
    //   const currentSnapshot = this.snapshots();
    //   this.certificateLoading.set(false);
    //   this.snapshots.set([{ ...currentSnapshot[0], status: 'done' }]);
    //   this.loading.set(false);
    // });
    const sub$ = new Subject();

    interval(3000).pipe(
      switchMap(() => this.backendApiService.getSnapshots()),
      takeUntil(sub$),
      catchError(() => []),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((snapshots) => {
      if (snapshots[0].id === snapshotId && snapshots[0].status === 'done') {
        const currentLoadings = [...this.certificateLoading()].filter(id => id !== snapshotId);
        this.certificateLoading.set(currentLoadings);
        sub$.next(null);
        sub$.complete();
      }

      this.snapshots.set(snapshots);
    });
  }
  
}
