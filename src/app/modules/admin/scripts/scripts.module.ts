import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScriptsGridComponent } from './scripts-grid/scripts-grid.component';
import { ScriptsRoutingModule } from './scripts-routing.module';
import { ScriptFormComponent } from './script-form/script-form.component';

@NgModule({
  declarations: [
    ScriptsGridComponent,
    ScriptFormComponent
  ],
  imports: [
    CommonModule,
    ScriptsRoutingModule
  ]
})
export class ScriptsModule { }
