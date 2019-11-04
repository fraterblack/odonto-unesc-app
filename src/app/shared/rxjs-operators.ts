import { MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { GridResponse } from './components/grid/grid';

export function mapToGridResponse(): MonoTypeOperatorFunction<GridResponse> {
  return input$ => input$.pipe(
    map((res) => {
      const { items, page, limit, total } = res;

      const mappedResponse: GridResponse = {
        items,
        page,
        limit,
        count: items.length,
        total,
      };

      return mappedResponse;
    })
  );
}
