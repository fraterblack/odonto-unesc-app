import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CasesGridComponent } from './cases-grid/cases-grid.component';
import { CasesRoutingModule } from './cases-routing.module';
import { CaseFormComponent } from './case-form/case-form.component';


@NgModule({
  declarations: [
    CasesGridComponent,
    CaseFormComponent
  ],
  imports: [
    CommonModule,
    CasesRoutingModule
  ]
})
export class CasesModule { }
