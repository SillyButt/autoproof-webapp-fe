import { Injectable } from '@angular/core';
import {keccak256} from "js-sha3";
// import keccak256 from "keccak256";

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {

  async createHash(file: File): Promise<string> {
    const reader = new FileReader();
    const result = await new Promise<string>((resolve, reject) => {
      reader.onload = (() => {
        const hashBuffer = keccak256.hex(reader.result as string);
        resolve(hashBuffer)
      });
      
      reader.onerror = ((error) => {
        reject(error);
      })

      reader.readAsBinaryString(file);
    });

    
    // TODO: Rewrite algo to cover multiple files
    // TODO: Add timestamp, name to hash?
    
    return result;
  }

}
