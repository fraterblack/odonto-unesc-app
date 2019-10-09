import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivitiesGridComponent } from './activities-grid/activities-grid.component';


const routes: Routes = [
  {
    path: '',
    component: ActivitiesGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
