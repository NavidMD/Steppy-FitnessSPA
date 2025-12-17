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
    if (sessionStorage.getItem('fake-token')) this.authStatus = true;
    this.subscription = this.authService.authenticationStatus.subscribe({
      next: (response) => (this.authStatus = response),
    });
  }
}
