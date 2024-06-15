import {Inject, inject, Injectable} from '@angular/core';
import {FirstFlowData} from "../first-flow/finish.service";
import {BackendApiService} from "../../services/backend-api.service";
import {SnapshotService} from "../../services/snapshot.service";
import {TonConnectService} from "../../services/ton-connect.service";
import {TuiAlertService} from "@taiga-ui/core";
import {catchError, EMPTY, from, map, Observable, switchMap, tap, throwError} from "rxjs";
import {SnapshotDto} from "../../interfaces/snapshot.interface";
import {Router} from "@angular/router";

@Injectable()
export class NewCertificateFlowService {

  readonly data: FirstFlowData = {
    files: [],
    description: '',
    name: '',
    address: '',
    agreeWithTerms: false,
  };
  
  private readonly backendApiService = inject(BackendApiService);
  private readonly snapshotService = inject(SnapshotService);
  private readonly tonConnectService = inject(TonConnectService);
  private readonly router = inject(Router);
  
  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}
  
  setFilesAndDescription(files: File[], description: string): void {
    this.data.files = files;
    this.data.description = description;
  }
  
  setNameAndAddress(name: string, address: string): void {
    this.data.name = name;
    this.data.address = address;
    this.data.agreeWithTerms = true;
  }
  
  createSnapshot(): Observable<void> {
    const walletAddress = 'testaddress';
    // const walletAddress = this.tonConnectService.account?.address;
    // if (!walletAddress) throw new Error("Wallet address is not defined");
    
    const file = this.data.files[0];
    
    return from(this.snapshotService.createHash(file)).pipe(
      map((hash) => ({
        description: this.data.description,
        mode: 'live',
        data: [{ filename: file.name, hash: `keccak256:${hash}` }],
      })),
      catchError((error) => {
        console.error(error);
        this.alerts.open('Failed to create hash', { status: 'error'});
        return EMPTY;
      }),
      switchMap((snapshot: SnapshotDto) => this.backendApiService.uploadSnapshot(snapshot).pipe(
        map((result) => {
          if (!result.result) return throwError(() => 'Failed to upload snapshot');
          return result;
        }),
        catchError((error) => {
          console.error(error);
          this.alerts.open('Failed to upload snapshot', { status: 'error'});
          return EMPTY;
        })
      )),
      tap(() => this.router.navigate(['/dashboard'])),
      map(() => undefined)
    );
  }

}
