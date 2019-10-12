import { ScriptFormComponent } from './script-form/script-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScriptsGridComponent } from './scripts-grid/scripts-grid.component';


const routes: Routes = [
  {
    path: '',
    component: ScriptsGridComponent
  },
  {
    path: 'create',
    component: ScriptFormComponent
  },
  {
    path: 'update/:id',
    component: ScriptFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScriptsRoutingModule { }
