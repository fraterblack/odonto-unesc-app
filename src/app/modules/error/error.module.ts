import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
