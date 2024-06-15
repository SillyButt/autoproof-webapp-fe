import {Component, DestroyRef, inject, signal} from '@angular/core';
import {TonConnectService} from "../../../services/ton-connect.service";
import {TuiButtonModule, TuiLoaderModule} from "@taiga-ui/core";
import {FinishService} from "../finish.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiLoaderModule
  ],
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
  providers: [FinishService],
})
export class FirstFlowFinishComponent {
  
  private tonConnectService = inject(TonConnectService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private finishService = inject(FinishService);

  loading = signal<boolean>(false);
  
  connect(): void {
    this.tonConnectService.tonConnectUI.openModal();

    const unsubscribe = this.tonConnectService.tonConnectUI.onStatusChange(async (wallet) => {
      console.log("Connected wallet:", wallet);

      if (wallet?.account) {
        this.loading.set(true);

        try {
          this.finishService.createUserAndSnapshot().pipe(
            takeUntilDestroyed(this.destroyRef)
          ).subscribe(() => {
            this.router.navigate(['/dashboard']);
          });
        } catch (error) {
          console.error(error);
          this.loading.set(false);
        }
      }
    });

    this.destroyRef.onDestroy(() => {
      unsubscribe();
    })
  }

}
