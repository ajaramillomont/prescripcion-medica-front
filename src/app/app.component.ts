import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
              <ng-container *ngIf="showNavbar">
                <app-navbar></app-navbar>
              </ng-container>
              <router-outlet></router-outlet>

            `
})
export class AppComponent {
  title = 'prescripcion-medica-front';

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const hiddenRoutes = ['/login', '/register'];
        this.showNavbar = !hiddenRoutes.includes(event.url);
      });
  }
}

