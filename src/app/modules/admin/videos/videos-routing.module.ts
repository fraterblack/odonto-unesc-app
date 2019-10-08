import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VideosGridComponent } from './videos-grid/videos-grid.component';


const routes: Routes = [
  {
    path: '',
    component: VideosGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }
