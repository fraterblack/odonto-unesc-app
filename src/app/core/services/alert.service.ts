import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export enum AlertType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, type: AlertType, duration?: number) {
    const snackSettings: MatSnackBarConfig = {
      panelClass: `odonto-snack-bar-${type}`,
      verticalPosition: 'top'
    };

    if (duration) {
      snackSettings.duration = duration;
    }

    this.snackBar.open(message, 'Fechar', snackSettings);
  }
}
