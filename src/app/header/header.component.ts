import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Output() menuBtnClicked = new EventEmitter<void>();
  authStatus: boolean = false;
  userFirstName!: string;

  constructor(private authService: AuthService, private router: Router) {}

  subscription!: Subscription;

  onMenuBtnClick() {
    this.menuBtnClicked.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.authService.authenticationStatus.subscribe({
      next: (res) => {
        this.authService.userIdSubject.subscribe({
          next: value => this.userFirstName = value.firstName

        })
        this.authStatus = res;
      }
    })
  }
}
