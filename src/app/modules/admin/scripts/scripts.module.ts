import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScriptsGridComponent } from './scripts-grid/scripts-grid.component';
import { ScriptsRoutingModule } from './scripts-routing.module';


@NgModule({
  declarations: [
    ScriptsGridComponent
  ],
  imports: [
    CommonModule,
    ScriptsRoutingModule
  ]
})
export class ScriptsModule { }
