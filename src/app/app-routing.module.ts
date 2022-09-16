import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';



const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LandingComponent },
  {path: 'login', component: LoginComponent, ...canActivate(redirectToDashboard) },
  {path: 'sign-up', component: SignupComponent, ...canActivate(redirectToDashboard) },
  {path: 'dashboard', component: DashboardComponent, ...canActivate(redirectToLogin) },
  {path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
