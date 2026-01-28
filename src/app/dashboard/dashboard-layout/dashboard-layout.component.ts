import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAdditionalInfo } from '../../authentication/user.model';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  constructor(public authService: AuthService) {}
  userInfo$!: Observable<UserAdditionalInfo>;

  ngOnInit(): void {
    this.userInfo$ = this.authService.userIdSubject.asObservable();
  }
}
