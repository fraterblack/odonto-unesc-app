import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../shared/material/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';

@NgModule({
  declarations: [LoginComponent, RecoveryComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule]
})
export class AuthModule {}
