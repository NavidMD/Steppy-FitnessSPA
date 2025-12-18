import { UserSigningInfo } from './user.model';
import { UserAdditionalInfo } from './user.model';
import { AuthData } from './auth.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: UserSigningInfo | null = null;
  authenticationStatus = new Subject<boolean>();
  userIdSubject = new BehaviorSubject<any>('');

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private database: AngularFirestore
  ) {
    this.firebaseAuth.authState.subscribe((user) => {
      this.userIdSubject.next(user?.uid);
    });
  }

  register(registerData: UserSigningInfo, additionalData: UserAdditionalInfo) {
    this.firebaseAuth
      //Create user in AuthenticationDb
      .createUserWithEmailAndPassword(
        registerData.email.trim(),
        registerData.password
      )
      .then((response) => {
        //Create a document of all user info in Users collection with unique UID
        const uid = response.user?.uid;
        console.log('User UID:', uid);
        additionalData.uid = uid;
        this.database.collection('Users').doc(uid).set(additionalData);
      })
      .catch((error) => console.log(error));
    this.authenticationStatus.next(true);
    this.router.navigate(['/']);
  }

  login(loginData: AuthData) {
    if (
      this.user &&
      loginData.email === this.user.email &&
      loginData.password === this.user.password
    ) {
      this.authenticationStatus.next(true);
    } else this.authenticationStatus.next(false);
  }

  logout() {
    this.user = null;
    this.authenticationStatus.next(false);
    sessionStorage.clear();
    localStorage.clear();
  }

  getUser() {
    return { ...this.user };
  }

  isAuthenticated() {
    return !!this.userIdSubject;
  }
}
