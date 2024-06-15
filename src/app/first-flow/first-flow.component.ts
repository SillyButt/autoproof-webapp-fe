import {Component, inject} from '@angular/core';
import {TuiBreadcrumbsModule} from "@taiga-ui/kit";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TuiLinkModule} from "@taiga-ui/core";
import {TuiItemModule} from "@taiga-ui/cdk";

interface Item {
  caption: string;
  routerLink: string;
}

@Component({
  selector: 'app-first-flow',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    TuiBreadcrumbsModule,
    TuiLinkModule,
    TuiItemModule,
    RouterLinkActive,
  ],
  templateUrl: './first-flow.component.html',
  styleUrl: './first-flow.component.scss',
})
export class FirstFlowComponent {
  
  readonly items: Item[] = [
    {
      caption: 'Select file',
      routerLink: '/first-flow/select-file',
    },
    {
      caption: 'Authorship',
      routerLink: '/first-flow/authorship',
    },
    {
      caption: 'Finish',
      routerLink: '/first-flow/finish',
    },
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
