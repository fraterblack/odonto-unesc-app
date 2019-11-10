import { PipeTransform, TemplateRef } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { SortDirection } from '@angular/material/sort';

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
