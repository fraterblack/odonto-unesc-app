export enum ConfirmationDialogType {
  CONFIRMATION = 'confirmation',
  ALERT= 'alert'
}

export interface ConfirmationDialogData {
  title?: string;
  message: string;
  mode?: ConfirmationDialogType;
}
