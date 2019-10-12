import { UserFormComponent } from './user-form/user-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersGridComponent } from './users-grid/users-grid.component';

const routes: Routes = [
  {
    path: '',
    component: UsersGridComponent
  },
  {
    path: 'create',
    component: UserFormComponent
  },
  {
    path: 'update/:id',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
