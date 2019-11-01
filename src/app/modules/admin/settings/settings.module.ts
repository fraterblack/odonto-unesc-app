import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { UpdateMyAccountComponent } from './update-my-account/update-my-account.component';
import { UpdateSettingsComponent } from './update-settings/update-settings.component';


@NgModule({
  declarations: [UpdateSettingsComponent, UpdateMyAccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
