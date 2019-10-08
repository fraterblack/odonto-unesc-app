import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScriptsGridComponent } from './scripts-grid/scripts-grid.component';


const routes: Routes = [
  {
    path: '',
    component: ScriptsGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScriptsRoutingModule { }
