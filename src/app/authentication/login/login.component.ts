import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('passwordInput') password!: NgModel;
  hidePassword: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}

  submitLogin(loginForm: NgForm) {

  }

}
