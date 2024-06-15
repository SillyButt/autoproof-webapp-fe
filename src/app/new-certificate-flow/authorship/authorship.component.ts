import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiErrorModule, TuiLinkModule} from "@taiga-ui/core";
import {TuiCheckboxLabeledModule, TuiFieldErrorPipeModule, TuiInputModule, TuiTextareaModule} from "@taiga-ui/kit";
import {Router} from "@angular/router";
import FirstFlowService from "../../../services/first-flow.service";
import {NewCertificateFlowService} from "../new-certificate-flow.service";

@Component({
  selector: 'app-authorship',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiLinkModule,
    TuiTextareaModule
  ],
  templateUrl: './authorship.component.html',
  styleUrl: './authorship.component.scss'
})
export class NewCertificateAuthorshipComponent implements OnInit {
  
  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    agreeWithTerms: new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });
  
  private readonly router = inject(Router);
  private readonly service = inject(NewCertificateFlowService);
  
  ngOnInit(): void {
    const data = this.service.data;
    if (data.name) this.form.controls.name.setValue(data.name);
    if (data.address) this.form.controls.address.setValue(data.address);
    if (data.agreeWithTerms) this.form.controls.agreeWithTerms.setValue(data.agreeWithTerms);
  }
  
  next(e: Event): void {
    e.preventDefault();
    
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity()
    
    if (this.form.invalid) {
      return;
    }
    
    this.service.setNameAndAddress(
      this.form.value.name!,
      this.form.value.address!,
    )
    
    this.router.navigate(['/new-certificate/pay']);
  }
}
