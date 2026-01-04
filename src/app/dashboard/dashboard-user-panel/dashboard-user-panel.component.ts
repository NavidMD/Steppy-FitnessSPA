import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { Observable } from 'rxjs';
import { UserAdditionalInfo } from '../../authentication/user.model';

@Component({
  selector: 'app-dashboard-user-panel',
  templateUrl: './dashboard-user-panel.component.html',
  styleUrl: './dashboard-user-panel.component.css'
})
export class DashboardUserPanelComponent implements OnInit {
  constructor(public authService: AuthService) {}
  userInfo$!: Observable<UserAdditionalInfo>;

  ngOnInit(): void {
    this.userInfo$ = this.authService.userIdSubject.asObservable()
  }
}
