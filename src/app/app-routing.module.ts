import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { ActiveTrainingComponent } from './active-training/active-training.component';
import { AuthGuard, PermissionService } from './authentication/auth.guard';

const routes: Routes = [
  { path: 'training/:id', component: ActiveTrainingComponent, canActivate: [AuthGuard] },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionService]
})
export class AppRoutingModule { }
