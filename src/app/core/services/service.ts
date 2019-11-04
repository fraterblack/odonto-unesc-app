import { HttpParams } from '@angular/common/http';

import { GridState } from './../../shared/components/grid/grid';

export abstract class Service {
  parseArgsToHttpParams(args: GridState): HttpParams {
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
}
