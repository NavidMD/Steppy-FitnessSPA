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
  userFirstName: string | null = 'نامشخض';
  title = 'fitness-app';

  loggingHandler() {
    if (this.authStatus) {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/signup'])
    }
    this.sidenav.close();
  }

  ngOnInit(): void {
    this.authService.userIdSubject.subscribe({
      next: (res) => {
        if(res.uid) {
          this.authStatus = true
          this.userFirstName = res.firstName;
        }
        else this.authStatus = false;
      }
    })
  }
}
