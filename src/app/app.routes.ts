import { Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {FirstFlowSelectFileComponent} from "./first-flow/select-file/select-file.component";
import { FirstFlowComponent } from './first-flow/first-flow.component';
import {FirstFlowAuthorshipComponent} from "./first-flow/authorship/authorship.component";
import {FirstFlowFinishComponent} from "./first-flow/finish/finish.component";
import {walletNotConnectedGuard} from "../guards/wallet-not-connected.guard";
import {NewCertificateFlowComponent} from "./new-certificate-flow/new-certificate-flow.component";
import {NewCertificatePayComponent} from "./new-certificate-flow/pay/pay.component";
import {NewCertificateSelectFileComponent} from "./new-certificate-flow/select-file/select-file.component";
import {NewCertificateAuthorshipComponent} from "./new-certificate-flow/authorship/authorship.component";
import {walletConnectedGuard} from "../guards/wallet-connected.guard";
import {CertificatesComponent} from "./dashboard/certificates/certificates.component";
import {SettingsComponent} from "./dashboard/settings/settings.component";
import {ReferralsComponent} from "./dashboard/referrals/referrals.component";

export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'first-flow', component: FirstFlowComponent, canActivate: [walletNotConnectedGuard],
    children: [
      { path: 'select-file', component: FirstFlowSelectFileComponent },
      { path: 'authorship', component: FirstFlowAuthorshipComponent },
      { path: 'finish', component: FirstFlowFinishComponent },
      { path: '', pathMatch: 'full', redirectTo: 'select-file' },
    ],
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [walletConnectedGuard], children: [
  // { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'certificates', component: CertificatesComponent },
    { path: 'referrals', component: ReferralsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'certificates' },
  ]},
  // { path: 'new-certificate', component: NewCertificateFlowComponent,
  { path: 'new-certificate', component: NewCertificateFlowComponent, canActivate: [walletConnectedGuard],
    children: [
      { path: 'select-file', component: NewCertificateSelectFileComponent },
      { path: 'authorship', component: NewCertificateAuthorshipComponent },
      { path: 'pay', component: NewCertificatePayComponent },
      { path: '', pathMatch: 'full', redirectTo: 'select-file' },
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
