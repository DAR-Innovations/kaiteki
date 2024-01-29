import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 403 && !req.url.includes('users/current')) {
          this.toastrService.open(
            'This service is only available to authorized users'
          );
          window.location.href = '/';
        }
        return throwError(() => err);
      })
    );
  }
}

export const sessionInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true },
];
