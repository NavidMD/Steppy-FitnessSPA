import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @ViewChild('passwordInput') password!: NgModel;
  @ViewChild('signupStepper') stepper!: MatStepper;
  @ViewChild('signupForm') signupForm!: NgForm;
  hidePassword: boolean = true;
  constructor(private authService: AuthService) {}

  goToNextStep() {
    if(this.signupForm.valid) {
      this.stepper.selected!.completed = true;
      this.stepper.next();
    }
  }

  submitSignUpForm(signupForm: NgForm,physicalInfoForm: NgForm) {
    this.authService.register({
      userName: signupForm.value.username,
      email: signupForm.value.email,
      dateOfBirth: signupForm.value.birthday,
      password: signupForm.value.password,
    })
    const userPhysicalInfo = {
      fistName: physicalInfoForm.value.firstName,
      lastName: physicalInfoForm.value.lastName,
      height: physicalInfoForm.value.height,
      weight: physicalInfoForm.value.weight,
      age: physicalInfoForm.value.age,
      gender: physicalInfoForm.value.gender
    }
    localStorage.setItem('userPhysicalInfo',JSON.stringify(userPhysicalInfo));
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
