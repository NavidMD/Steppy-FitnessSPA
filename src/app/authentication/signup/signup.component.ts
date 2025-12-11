import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @ViewChild('passwordInput') password!: NgModel;
  hidePassword: boolean = true;
  constructor(private authService: AuthService) {}

  submitSignUpForm(signupForm: NgForm) {
    this.authService.register({
      userName: signupForm.value.username,
      email: signupForm.value.email,
      dateOfBirth: signupForm.value.birthday,
      password: signupForm.value.password,
    })
  }

  passwordCheck() {
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;
    if (
      !this.password.value.match(passwordRegex) &&
      this.password.value.length >= 8
    ) {
      return this.password.control.setErrors({ passwordPattern: true });
    }
  }
}
