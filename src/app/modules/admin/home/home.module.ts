import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../../shared/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule]
})
export class AdminHomeModule {}
