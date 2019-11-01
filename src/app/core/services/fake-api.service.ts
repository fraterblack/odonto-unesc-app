import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GridResponse, GridState } from '../../shared/components/grid/grid';

/**
 * This service must be used for dev-test purpose only
 * Must be used integrated with json-server
 */
@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  constructor(private httpClient: HttpClient) {}

  queryVideos(args: GridState): Observable<GridResponse> {
    const api = 'http://localhost:4000/api/videos';

    return this.get(this.getQueryUrl(api, args), args.page, args.limit);
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

  private getQueryUrl(endpoint: string, args: GridState): string {
    let requestUrl = `${endpoint}?_sort=${args.sort}&_order=${args.order}&_page=${args.page}&_limit=${args.limit}`;

    if (args.search) {
      requestUrl += `&q=${args.search}`;
    }

    return requestUrl;
  }
}
