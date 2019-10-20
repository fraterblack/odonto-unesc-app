import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { UpdateSettingsComponent } from './update-settings/update-settings.component';


@NgModule({
  declarations: [UpdateSettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
