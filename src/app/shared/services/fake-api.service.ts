import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GridResponse } from './../components/grid/grid';

/**
 * This service must be used for dev-test purpose only
 * Must be used integrated with json-server
 */
@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  constructor(private httpClient: HttpClient) {}

  queryVideos(sort: string, order: string, page: number, limit: number = 30, search: string = ''): Observable<GridResponse> {
    const href = 'http://localhost:3000/videos';

    const requestUrl = `${href}?_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}&q=${search}`;

    return this.get(requestUrl, page, limit);
  }

  private get(requestUrl: string, page: number, limit: number) {
    return this.httpClient.get(requestUrl, { observe: 'response' })
      .pipe(
        map((resp) => {
          const results = resp.body as [];

          const mappedResponse: GridResponse = {
            results,
            limit,
            page,
            count: results.length,
            total: Number.parseInt(resp.headers.get('x-total-count'), 0),
          };

          return mappedResponse;
        })
      );
  }
}
