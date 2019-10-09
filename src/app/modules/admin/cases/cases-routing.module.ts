import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasesGridComponent } from './cases-grid/cases-grid.component';


const routes: Routes = [
  {
    path: '',
    component: CasesGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
