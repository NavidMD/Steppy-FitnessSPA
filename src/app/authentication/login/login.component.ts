import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, NgModel } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  @ViewChild('passwordInput') password!: NgModel;
  hidePassword: boolean = true;
  spinnerActive: boolean = false;

  subscription!: Subscription;

  constructor(private authService: AuthService) {}

  async submitLogin(loginForm: NgForm) {
    this.spinnerActive = true;
    await this.authService
      .login({
        email: loginForm.value.email,
        password: loginForm.value.password,
      })
      .then(() => (this.spinnerActive = false));
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
