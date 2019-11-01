import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { UpdateSettingsComponent } from './update-settings/update-settings.component';
import { UpdateMyAccountComponent } from './update-my-account/update-my-account.component';


@NgModule({
  declarations: [UpdateSettingsComponent, UpdateMyAccountComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
