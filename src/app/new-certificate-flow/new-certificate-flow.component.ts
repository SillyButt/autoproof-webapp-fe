import {Component, inject} from '@angular/core';
import {TuiBreadcrumbsModule} from "@taiga-ui/kit";
import {TuiLinkModule} from "@taiga-ui/core";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NewCertificateFlowService} from "./new-certificate-flow.service";

@Component({
  selector: 'app-new-certificate-flow',
  standalone: true,
  imports: [
    TuiBreadcrumbsModule,
    TuiLinkModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './new-certificate-flow.component.html',
  styleUrl: './new-certificate-flow.component.scss',
  providers: [NewCertificateFlowService]
})
export class NewCertificateFlowComponent {

  readonly items = [
    { caption: 'Select file', routerLink: '/new-certificate/select-file' },
    { caption: 'Authorship', routerLink: '/new-certificate/authorship' },
    { caption: 'Create', routerLink: '/new-certificate/pay' },
  ];
  
  private readonly router = inject(Router);
  
  breadcrumbClick(e: Event, routerLink: string): void {
    const currentTab = this.router.getCurrentNavigation()?.finalUrl?.fragment?.split('/first-flow/')[1];
    const currentTabIndex = this.items.findIndex(item => item.routerLink === `/first-flow/${currentTab}`);
    const clickedTabIndex = this.items.findIndex(item => item.routerLink === routerLink);
    
    if (currentTabIndex < clickedTabIndex) {
      e.preventDefault();
    }
  }
  
}
