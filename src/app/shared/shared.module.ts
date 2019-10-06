import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationsComponent } from './components/notifications/notifications.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, NotificationsComponent]
})
export class SharedModule {}
