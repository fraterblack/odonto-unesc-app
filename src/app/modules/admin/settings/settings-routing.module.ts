import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateMyAccountComponent } from './update-my-account/update-my-account.component';
import { UpdateSettingsComponent } from './update-settings/update-settings.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateSettingsComponent
  },
  {
    path: 'my-account',
    component: UpdateMyAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
