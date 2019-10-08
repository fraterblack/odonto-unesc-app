import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersGridComponent } from './users-grid/users-grid.component';

const routes: Routes = [
  {
    path: '',
    component: UsersGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
