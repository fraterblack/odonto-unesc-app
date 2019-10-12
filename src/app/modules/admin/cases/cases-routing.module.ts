import { CaseFormComponent } from './case-form/case-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasesGridComponent } from './cases-grid/cases-grid.component';


const routes: Routes = [
  {
    path: '',
    component: CasesGridComponent
  },
  {
    path: 'create',
    component: CaseFormComponent
  },
  {
    path: 'update/:id',
    component: CaseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
