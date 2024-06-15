import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TuiButtonModule, TuiErrorModule, TuiNotificationModule} from "@taiga-ui/core";
import {TuiFieldErrorPipeModule, TuiFilesModule, TuiInputFilesModule, TuiTextareaModule} from "@taiga-ui/kit";
import {Router, RouterLink} from "@angular/router";
import FirstFlowService from "../../../services/first-flow.service";
import {NewCertificateFlowService} from "../new-certificate-flow.service";

@Component({
  selector: 'app-select-file',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiFilesModule,
    TuiInputFilesModule,
    TuiNotificationModule,
    TuiTextareaModule,
    RouterLink
  ],
  templateUrl: './select-file.component.html',
  styleUrl: './select-file.component.scss',
})
export class NewCertificateSelectFileComponent implements OnInit {
  
  readonly form = new FormGroup({
    files: new FormControl<File[]>([], { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('',  { nonNullable: true, validators: [Validators.required] }),
  });
  
  private readonly router = inject(Router);
  private readonly service = inject(NewCertificateFlowService);
  
  ngOnInit(): void {
    const data = this.service.data;
    if (data.files.length) this.form.controls.files.setValue(data.files);
    if (data.description) this.form.controls.description.setValue(data.description);
  }
  
  removeFile({ name }: File): void {
    this.form.controls.files.setValue(
      this.form.controls.files.value?.filter((current: File) => current.name !== name) ?? [],
    );
  }
  
  next(e: Event): void {
    e.preventDefault();
    
    this.form.markAllAsTouched();
    this.form.controls.description.updateValueAndValidity();
    if (this.form.invalid) return;
    
    this.service.setFilesAndDescription(
      this.form.value.files!,
      this.form.value.description!,
    );
    
    this.router.navigate(['/new-certificate/authorship']);
  }

}
