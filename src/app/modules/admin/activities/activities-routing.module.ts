import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivitiesGridComponent } from './activities-grid/activities-grid.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';


const routes: Routes = [
  {
    path: '',
    component: ActivitiesGridComponent
  },
  {
    path: 'create',
    component: ActivityFormComponent
  },
  {
    path: 'update/:id',
    component: ActivityFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
