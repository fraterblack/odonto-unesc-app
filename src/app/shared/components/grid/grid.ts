import { PipeTransform, TemplateRef } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SortDirection } from '@angular/material/sort';
import { Subject } from 'rxjs';

import { Unsubscrable } from '../../common';

/*
* Constants
*/
export const GRID_PAGINATION_LIMIT = 30;

/*
* Interfaces
*/
export interface Grid {
  columns: Column[];
  paging: Paging;
  sorting?: {
    default: Sorting;
    additional?: Sorting[];
  };
}

export interface Column {
  name: string;
  header: string;

  binding: string | TemplateRef<any>;

  sortActive?: boolean;
  sortId?: string;

  rowCssClass?: string;
  headerCssClass?: string;

  pipe?: PipeTransform;
  pipeParams?: string;
}

export interface Paging {
  page: number;
  limit: number;
}

export interface Sorting {
  column: string;
  direction: SortDirection | string;
}

export interface GridState {
  sort?: string;
  order?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface  GridResponse {
  items: any[];
  limit: number;
  page: number;
  count: number;
  total: number;
}

/*
* Classes
*/
export class GridPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'Mostrando';
  previousPageLabel = 'Página anterior';
  nextPageLabel = 'Próxima página';
  firstPageLabel = 'Primeira página';
  lastPageLabel = 'Última página';
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

  /**
   * Get data from new grid state
   *
   * @param state Grid state
   */
  abstract onGridStateChange(state: GridState): void;

  getQueryParamsFromGrid(grid: Grid): GridState {
    return {
      sort: grid.sorting.default.column,
      order: grid.sorting.default.direction,
      page: grid.paging.page,
      limit: grid.paging.limit
    };
  }
}
