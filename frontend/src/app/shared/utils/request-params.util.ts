import { HttpParams } from '@angular/common/http';

export function createQueryParams(filterParam: Object): HttpParams {
  let param = new HttpParams();
  Object.entries(filterParam).forEach(([key, value]) => {
    if (value) param = param.set(key, value);
  });
  return param;
}
