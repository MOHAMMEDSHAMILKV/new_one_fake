import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetComponent } from './reset/reset.component';
import { SidraLoginComponent } from './sidra-login/sidra-login.component';
const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'loginSidra', component: SidraLoginComponent },
      { path: 'forgot_password', component: ForgotPasswordComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'reset/:name', component: ResetComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
