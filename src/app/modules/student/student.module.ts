import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
