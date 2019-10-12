import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActivitiesGridComponent } from './activities-grid/activities-grid.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    ActivitiesGridComponent,
    ActivityFormComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    MaterialModule
  ]
})
export class ActivitiesModule { }
