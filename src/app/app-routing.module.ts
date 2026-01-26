import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { ActiveTrainingComponent } from './active-training/active-training.component';
import { AuthGuard, PermissionService } from './authentication/auth.guard';
import { FormGuard, FormStrictionService } from './authentication/form.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: 'training/:id',
    component: ActiveTrainingComponent,
    canActivate: [AuthGuard],
  },
  { path: 'training',
    component: TrainingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [FormGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [FormGuard],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionService, FormStrictionService],
})
export class AppRoutingModule {}
