import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GridResponse } from '../grid/grid';
import { Column } from './../grid/grid';

export interface SearchRelatedItemData {
  title?: string;
  columns?: Column[];
  query: (params: HttpParams) => Observable<GridResponse>;
}
