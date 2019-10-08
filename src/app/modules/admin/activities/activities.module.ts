import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActivitiesGridComponent } from './activities-grid/activities-grid.component';
import { ActivitiesRoutingModule } from './activities-routing.module';


@NgModule({
  declarations: [
    ActivitiesGridComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule
  ]
})
export class ActivitiesModule { }
