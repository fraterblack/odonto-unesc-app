import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActivityRoutingModule } from './activity-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';


@NgModule({
  declarations: [WorkspaceComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule
  ],
  exports: [WorkspaceComponent]
})
export class ActivityModule { }
