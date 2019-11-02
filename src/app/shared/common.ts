import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { AlertService, AlertType } from './../core/services/alert.service';
import { FormHelper } from './form-helper';

/**
 * Set of commom messages into the application
 */
export enum Message {
  INVALID_FORM = 'Você tem erros no formulário abaixo',
  SUCCESSFUL_REGISTRY_EDITION = 'Cadastro editado com sucesso!',
  UNSUCCESSFUL_REGISTRY_EDITION = 'Houve um erro ao editar o cadastro'
}

/**
 * Abstract class to easily implements Unsubscribe behaviors
 */
export abstract class Unsubscrable implements OnDestroy {
  protected ngUnsubscribe = new Subject();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

/**
 * Abstract class to easily implements Form behaviors
 */
export abstract class Form extends Unsubscrable {
  constructor(private alertService: AlertService) {
    super();
  }

  /**
   * Validate form
   *
   * @param formGroup FormGroup
   */
  validateForm(formGroup: FormGroup) {
    if (FormHelper.hasError(formGroup)) {
      FormHelper.markAllTouched(formGroup);
      this.alertService.open(Message.INVALID_FORM, AlertType.ERROR, 25000);

      return false;
    }

    return true;
  }

  /**
   * Emits a success message
   *
   * @param message Message to be showed
   */
  emitSuccessMessage(message: string = Message.SUCCESSFUL_REGISTRY_EDITION) {
    this.alertService.open(message, AlertType.SUCCESS, 2500);
  }

  /**
   * Emits a error message
   *
   * @param message Message to be showed
   */
  emitErrorMessage(message: string = Message.UNSUCCESSFUL_REGISTRY_EDITION) {
    this.alertService.open(message, AlertType.ERROR, 30000);
  }
}
