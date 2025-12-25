import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private router: Router, private auth: AngularFireAuth) {}
    // A Guard for authorization when user has not signed in
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.authState.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionService).canActivate(next,state);
}
