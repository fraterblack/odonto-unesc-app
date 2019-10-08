import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CasesGridComponent } from './cases-grid/cases-grid.component';
import { CasesRoutingModule } from './cases-routing.module';


@NgModule({
  declarations: [
    CasesGridComponent
  ],
  imports: [
    CommonModule,
    CasesRoutingModule
  ]
})
export class CasesModule { }
