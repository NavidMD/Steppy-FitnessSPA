import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private authService: AuthService, private router: Router) { }
  authStatus: boolean = false;
  title = 'fitness-app';

  loggingHandler() {
    if (this.authStatus) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/signup'])
    }
    this.sidenav.close();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('fake-token')) this.authStatus = true;
    this.authService.authenticationStatus.subscribe({
      next: response => this.authStatus = response,
    })
  }
}
