import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class LoginModule { }
