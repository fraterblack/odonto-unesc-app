import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmationDialogType } from './confirmation-dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(protected dialog: MatDialog) { }

  open(message: string, title?: string, mode?: ConfirmationDialogType): Observable<any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title,
        message,
        mode: mode || ConfirmationDialogType.CONFIRMATION
      }
    }).afterClosed();
  }
}
