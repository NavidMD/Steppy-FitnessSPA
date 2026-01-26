import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map, Observable, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormStrictionService {
  constructor(private router: Router, private auth: AngularFireAuth) {}
  // A Guard for multiple sign in and login striction after user signed in
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}

export const FormGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(FormStrictionService).canActivate(next,state);
}

