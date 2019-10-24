import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { GridComponent } from './components/grid/grid.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MaterialModule } from './material/material.module';
import { DynamicPipe } from './pipes/dynamic.pipe';

@NgModule({
  declarations: [
    NotificationsComponent,
    GridComponent,
    DynamicPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    NotificationsComponent,
    GridComponent,
    DynamicPipe
  ]
})
export class SharedModule {}
