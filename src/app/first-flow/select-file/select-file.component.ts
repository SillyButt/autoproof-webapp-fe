import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {TuiButtonModule, TuiErrorModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputFilesModule, TuiTextareaModule} from "@taiga-ui/kit";
import {ActivatedRoute, Router} from "@angular/router";
import FirstFlowService from "../../../services/first-flow.service";

@Component({
  selector: 'app-select-file',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    ReactiveFormsModule,
    TuiNotificationModule,
    TuiInputFilesModule,
    TuiTextareaModule,
    TuiButtonModule,
    NgIf,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
  ],
  templateUrl: './select-file.component.html',
  styleUrl: './select-file.component.scss'
})
export class FirstFlowSelectFileComponent implements OnInit {

  readonly form = new FormGroup({
    files: new FormControl<File[]>([], { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('',  { nonNullable: true, validators: [Validators.required] }),
  });
  
  private readonly router = inject(Router);
  private readonly firstFlowService = inject(FirstFlowService);
  
  ngOnInit(): void {
    const data = this.firstFlowService.data;
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
    
    this.firstFlowService.setFilesAndDescription(
      this.form.value.files!,
      this.form.value.description!,
    );
    
    this.router.navigate(['/first-flow/authorship']);
  }
  
}
