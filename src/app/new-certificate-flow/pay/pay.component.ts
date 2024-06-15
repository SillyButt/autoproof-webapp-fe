import {Component, inject, signal} from '@angular/core';
import {TuiButtonModule, TuiLoaderModule} from "@taiga-ui/core";
import {NewCertificateFlowService} from "../new-certificate-flow.service";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiLoaderModule
  ],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class NewCertificatePayComponent {
  
  private newCertificateFlowService = inject(NewCertificateFlowService);
  
  loading = signal<boolean>(false);
  
  createCertificate(): void {
    this.loading.set(true);
    this.newCertificateFlowService.createSnapshot().pipe(
      catchError((error) => {
        console.error(error);
        this.loading.set(false);
        return EMPTY;
      })
    ).subscribe();
  }

}
