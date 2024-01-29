import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

export function createQueryParams(filterParam: Object): HttpParams {
  let param = new HttpParams();
  Object.entries(filterParam).forEach(([key, value]) => {
    if (value) param = param.set(key, value);
  });
  return param;
}

export function createQueryParamsOnFilter(filter: { [key: string]: any }) {
  const filteredParams: { [key: string]: any } = {};
  for (const key in filter) {
    if (filter[key] !== undefined && filter[key] !== '') {
      filteredParams[key] = filter[key];
    }
  }

  return filteredParams;
}

export function parseQueryParams<T>(
  queryParams: Params,
  defaults: Partial<T>
): Partial<T> {
  const parsedParams: Partial<T> = {};

  for (const key in defaults) {
    if (queryParams.hasOwnProperty(key)) {
      parsedParams[key] = queryParams[key];
    } else if (defaults[key] !== undefined) {
      parsedParams[key] = defaults[key];
    }
  }

  return parsedParams;
}
