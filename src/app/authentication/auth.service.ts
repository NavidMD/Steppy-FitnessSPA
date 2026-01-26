import { UserSigningInfo } from './user.model';
import { UserAdditionalInfo } from './user.model';
import { AuthData } from './auth.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseErrorHandlingService } from '../shared/services/firebaseErrorHandling.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: UserSigningInfo | null = null;
  authenticationStatus = new Subject<boolean>();
  userIdSubject = new BehaviorSubject<any>(null);

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private database: AngularFirestore,
    private snackbar: MatSnackBar,
    private errorService: FirebaseErrorHandlingService
  ) {
      this.firebaseAuth.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            this.authenticationStatus.next(true);
            return this.database
              .collection('Users')
              .doc<UserAdditionalInfo>(user.uid)
              .valueChanges();
          } else {
            this.authenticationStatus.next(false);
            return of(null);
          }
        })
      )
      .subscribe((doc) => {
        this.userIdSubject.next(doc ?? null);
      });
  }

  async register(registerData: UserSigningInfo, additionalData: UserAdditionalInfo) {
    return this.firebaseAuth
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
        this.authenticationStatus.next(true);
        this.router.navigate(['/']);
        return true;
      })
      .catch((error) => {
        const errorMsg = this.errorService.getErrorMessage(error.code);
        this.snackbar.open(errorMsg, 'متوجه شدم', { duration: 5000 });
        return false;
      });
  }

  async login(loginData: AuthData) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then((credential) => {
        this.authenticationStatus.next(true);
        this.router.navigate(['/']);
        return true;
      })
      .catch((error) => {
        const errorMsg = this.errorService.getErrorMessage(error.code);
        this.snackbar.open(errorMsg, 'متوجه شدم', { duration: 5000 });
        return false;
      });
  }

  logout() {
    this.firebaseAuth.signOut().then(() => {
      this.user = null;
      this.authenticationStatus.next(false);
      this.userIdSubject.next({ uid: null, firstName: null });
      this.router.navigate(['/login']);
    });
  }

  getUser() {
    return { ...this.user };
  }

  isAuthenticated() {
    return this.firebaseAuth.authState.pipe(map((user) => !!user));
  }
}
