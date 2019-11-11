import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

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

export function filterResponse<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((event.loaded * 100) / event.total));
    }
  });
}
