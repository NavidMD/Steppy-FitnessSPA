import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatStepper } from '@angular/material/stepper';
import moment from 'jalali-moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnDestroy, OnInit {
  @ViewChild('passwordInput') password!: NgModel;
  @ViewChild('signupStepper') stepper!: MatStepper;
  @ViewChild('signupForm') signupForm!: NgForm;
  hidePassword: boolean = true;
  welcomeStepShown: boolean = false;
  spinnerActive: boolean = false;
  subscription!: Subscription;
  firstStepShow: boolean = false;

  constructor(private authService: AuthService) {}

  firstStepHandler() {
    if(this.firstStepShow === true) {
      this.stepper.selected!.completed = true;
      this.stepper.next();
    }
  }

  goToNextStep() {
    if (this.signupForm.valid) {
      this.stepper.selected!.completed = true;
      this.stepper.next();
    }
  }

  async submitSignUpForm(signupForm: NgForm, physicalInfoForm: NgForm) {
    this.spinnerActive = true;
    const userPhysicalInfo = {
      userName: signupForm.value.username,
      firstName: physicalInfoForm.value.firstName,
      lastName: physicalInfoForm.value.lastName,
      height: physicalInfoForm.value.height,
      weight: physicalInfoForm.value.weight,
      age: physicalInfoForm.value.age,
      dateOfBirth: moment(signupForm.value.dateOfBirth).format('YYYY-MM-DD'),
      gender: physicalInfoForm.value.gender,
    };
    await this.authService
      .register(
        {
          email: signupForm.value.email,
          password: signupForm.value.password,
        },
        userPhysicalInfo
      )
      .then((result) => {
        this.spinnerActive = false;
      });
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

  ngOnInit(): void {
    if (window.innerWidth < 768) {
      this.firstStepShow = true;
    } else this.firstStepShow = false;
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.firstStepShow = false;
      } else if (window.innerWidth <= 768) {
        this.firstStepShow = true;
      }
    });
    this.stepper.previous();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
