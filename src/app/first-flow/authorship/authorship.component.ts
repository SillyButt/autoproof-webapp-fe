import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiCheckboxLabeledModule, TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiErrorModule, TuiLinkModule} from "@taiga-ui/core";
import {AsyncPipe} from "@angular/common";
import {Router} from "@angular/router";
import FirstFlowService from '../../../services/first-flow.service';

@Component({
  selector: 'app-authorship',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiButtonModule,
    TuiCheckboxLabeledModule,
    TuiLinkModule
  ],
  templateUrl: './authorship.component.html',
  styleUrl: './authorship.component.scss'
})
export class FirstFlowAuthorshipComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    agreeWithTerms: new FormControl<boolean>(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });
  
  private readonly router = inject(Router);
  private readonly firstFlowService = inject(FirstFlowService);
  
  ngOnInit(): void {
    const data = this.firstFlowService.data;
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
    
    this.firstFlowService.setNameAndAddress(
      this.form.value.name!,
      this.form.value.address!,
    )
    
    this.router.navigate(['/first-flow/finish']);
  }
}
