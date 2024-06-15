import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiErrorModule} from "@taiga-ui/core";
import {TuiFieldErrorPipeModule, TuiInputDateModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiButtonModule} from "@taiga-ui/experimental";
import {TonConnectService} from "../../../services/ton-connect.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  private readonly tonConnectService = inject(TonConnectService);

  logOut() {
    this.tonConnectService.tonConnectUI.disconnect();
  }

}
