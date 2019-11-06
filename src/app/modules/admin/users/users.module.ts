import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersGridComponent } from './users-grid/users-grid.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersGridComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsersModule { }
