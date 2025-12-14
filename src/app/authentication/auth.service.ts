import { UserInfo } from "./user.model";
import { AuthData } from "./auth.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router) {}
  private user: UserInfo | null = null;
  authenticationStatus = new Subject<boolean>();

  register(registerData: UserInfo) {
    this.user = {
      userName: registerData.userName,
      email: registerData.email,
      dateOfBirth: registerData.dateOfBirth,
      password: registerData.password,
      userId: Date.now()
    }
    this.authenticationStatus.next(true);
    this.router.navigate(['/']);
    sessionStorage.setItem('fake-token', JSON.stringify(this.user.userId));
  }

  login(loginData: AuthData) {
    if(this.user &&
      loginData.email === this.user.email &&
      loginData.password === this.user.password)
    {
      this.authenticationStatus.next(true)
    }
    else this.authenticationStatus.next(false);
  }

  logout() {
    this.user = null;
    this.authenticationStatus.next(false);
    sessionStorage.clear();
    localStorage.clear();
  }

  getUser() {
    return {...this.user};
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('fake-token');
  }
}
