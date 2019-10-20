import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../../../shared/shared.module';
import { ScriptFormComponent } from './script-form/script-form.component';
import { ScriptsGridComponent } from './scripts-grid/scripts-grid.component';
import { ScriptsRoutingModule } from './scripts-routing.module';

@NgModule({
  declarations: [
    ScriptsGridComponent,
    ScriptFormComponent
  ],
  imports: [
    CommonModule,
    ScriptsRoutingModule,
    SharedModule
  ]
})
export class ScriptsModule { }
