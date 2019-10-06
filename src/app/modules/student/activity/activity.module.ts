import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentActivityRoutingModule } from './activity-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';


@NgModule({
  declarations: [WorkspaceComponent],
  imports: [
    CommonModule,
    StudentActivityRoutingModule
  ],
  exports: [WorkspaceComponent]
})
export class StudentActivityModule { }
