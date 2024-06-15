import {Injectable} from "@angular/core";
import {FirstFlowData} from "../app/first-flow/finish.service";

@Injectable({
  providedIn: 'root'
})
export default class FirstFlowService {
  
  readonly data: FirstFlowData = {
    files: [],
    description: '',
    name: '',
    address: '',
    agreeWithTerms: false,
  };
  
  setFilesAndDescription(files: File[], description: string): void {
    this.data.files = files;
    this.data.description = description;
  }
  
  setNameAndAddress(name: string, address: string): void {
    this.data.name = name;
    this.data.address = address;
    this.data.agreeWithTerms = true;
  }
  
}
