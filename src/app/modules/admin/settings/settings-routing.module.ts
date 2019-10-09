import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateSettingsComponent } from './update-settings/update-settings.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
