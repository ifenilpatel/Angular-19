import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutheticationComponent } from './authetication.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { TwoFactorAuthenticationComponent } from './components/two-factor-authentication/two-factor-authentication.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: AutheticationComponent,
    children: [
      {
        path: 'sign-in',
        component: SigninComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'two-factor-authentication',
        component: TwoFactorAuthenticationComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutheticationRoutingModule {}
