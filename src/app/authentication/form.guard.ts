import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map, Observable, take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormStrictionService {
  constructor(private router: Router, private auth: AngularFireAuth) {}
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

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(FormStrictionService).canActivate(next,state);
}

