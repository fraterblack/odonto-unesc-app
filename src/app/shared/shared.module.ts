import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { GridComponent } from './components/grid/grid.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RelatedItemsSelectorComponent } from './components/related-items-selector/related-items-selector.component';
import { SearchRelatedItemComponent } from './components/search-related-item/search-related-item.component';
import { MaterialModule } from './material/material.module';
import { DynamicPipe } from './pipes/dynamic.pipe';

@NgModule({
  declarations: [
    NotificationsComponent,
    GridComponent,
    DynamicPipe,
    RelatedItemsSelectorComponent,
    ConfirmationDialogComponent,
    SearchRelatedItemComponent,
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
    SearchRelatedItemComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    SearchRelatedItemComponent
  ]
})
export class SharedModule {}
