import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreteSnapshotResponse, SnapshotDto, SnapshotResult} from "../interfaces/snapshot.interface";
import {environment} from "../environments/environment";
import {firstValueFrom, map, Observable} from "rxjs";
import {CreateUserResponse, UserDto} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class BackendApiService extends HttpClient {

  uploadSnapshot(snapshot: SnapshotDto): Observable<CreteSnapshotResponse> {
    return this.post<CreteSnapshotResponse>(`${environment.backendApiUrl}/api/tg/upload_snap`, snapshot);
  }

  getSnapshots(): Observable<SnapshotResult[]> {
    return this.get<SnapshotResult[]>(`${environment.backendApiUrl}/api/tg/snapshots`).pipe(
      map((response: any) => response.snap_lst)
    );
  }

  createUser(snapshot: UserDto): Observable<CreateUserResponse> {
    return this.post<CreateUserResponse>(`${environment.backendApiUrl}/api/tg/create_user`, snapshot);
  }
  
  appendTransactionIdToSnapshot(snapshotId: string, transactionId: string): Observable<any> {
    return this.post(`${environment.backendApiUrl}/api/tg/pay_snapshot/${snapshotId}`, {
      tg_transaction_id: transactionId,
    });
  }
  
  
}
