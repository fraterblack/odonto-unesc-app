import { HttpParams } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { AlertService, AlertType } from './../core/services/alert.service';
import { Grid, GridResponse, GridState } from './components/grid/grid';
import { FormHelper } from './form-helper';

/**
 * Set of commom messages into the application
 */
export enum Message {
  INVALID_FORM = 'Você tem erros no formulário abaixo',

  SUCCESSFUL_REGISTRY_INSERTION = 'Registro salvo com sucesso!',
  UNSUCCESSFUL_REGISTRY_INSERTION = 'Houve um erro ao salvar o registro',

  SUCCESSFUL_REGISTRY_EDITION = 'Registro editado com sucesso!',
  UNSUCCESSFUL_REGISTRY_EDITION = 'Houve um erro ao editar o registro',

  SUCCESSFUL_REGISTRY_DELETION = 'Registro excluído com sucesso!',
  UNSUCCESSFUL_REGISTRY_DELETION = 'Houve um erro ao excluir o registro'
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
export abstract class FormComponent extends Unsubscrable {
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
  emitSuccessMessage(message: string) {
    this.alertService.open(message, AlertType.SUCCESS, 2500);
  }

  /**
   * Emits a error message
   *
   * @param message Message to be showed
   */
  emitErrorMessage(message: string) {
    this.alertService.open(message, AlertType.ERROR, 30000);
  }
}

export abstract class GridComponent extends Unsubscrable {
  /**
   * Controls busy mode
   */
  busy = false;

  /**
   * Grid settings
   */
  grid: Grid;

  /**
   * Grid data returned from query endpoint
   */
  data: Subject<GridResponse> = new Subject();

  constructor(private alertService: AlertService) {
    super();
  }

  /**
   * Get data from new grid state
   *
   * @param state Grid state
   */
  abstract onGridStateChange(state: GridState): void;

  /**
   * Get GridState object from Grid settings
   *
   * @param grid GridState
   */
  getQueryParamsFromGrid(grid: Grid): GridState {
    return {
      sort: grid.sorting.default.column,
      order: grid.sorting.default.direction,
      page: grid.paging.page,
      limit: grid.paging.limit
    };
  }

  parseGridStateToHttpParams(args: GridState): HttpParams {
    const obj: any = {};
    const { sort, order, page, limit, search } = args;

    if (sort) {
      obj.sort = sort;
    }

    if (order) {
      obj.order = order;
    }

    if (page) {
      obj.page = page;
    }

    if (limit) {
      obj.limit = limit;
    }

    if (search) {
      obj.search = search;
    }

    return new HttpParams({
      fromObject: obj
    });
  }

  /**
   * Emits a success message
   *
   * @param message Message to be showed
   */
  emitSuccessMessage(message: string) {
    this.alertService.open(message, AlertType.SUCCESS, 2500);
  }

  /**
   * Emits a error message
   *
   * @param message Message to be showed
   */
  emitErrorMessage(message: string) {
    this.alertService.open(message, AlertType.ERROR, 30000);
  }
}
