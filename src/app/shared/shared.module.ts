import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { GridComponent } from './components/grid/grid.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RelatedItemsSelectorComponent } from './components/related-items-selector/related-items-selector.component';
import { MaterialModule } from './material/material.module';
import { DynamicPipe } from './pipes/dynamic.pipe';

@NgModule({
  declarations: [
    NotificationsComponent,
    GridComponent,
    DynamicPipe,
    RelatedItemsSelectorComponent,
    ConfirmationDialogComponent,
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
    DynamicPipe,
    RelatedItemsSelectorComponent,
    ConfirmationDialogComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ]
})
export class SharedModule {}
