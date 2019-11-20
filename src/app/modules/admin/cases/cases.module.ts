import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { CaseFormComponent } from './case-form/case-form.component';
import { CasesGridComponent } from './cases-grid/cases-grid.component';
import { CasesRoutingModule } from './cases-routing.module';


@NgModule({
  declarations: [
    CasesGridComponent,
    CaseFormComponent
  ],
  imports: [
    CommonModule,
    CasesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CasesModule { }
