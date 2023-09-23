import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { ResetComponent } from './reset/reset.component';
import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';
import { SidraLoginComponent } from './sidra-login/sidra-login.component';
import { ComponentsModule } from 'src/app/components/components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {Ng2TelInputModule} from 'ng2-tel-input';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    OtpComponent,
    ResetComponent,
    SidraLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng9PasswordStrengthBarModule,
    NgOtpInputModule,
    ComponentsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    Ng2TelInputModule
  ]
})
export class AuthModule { }
