import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { TokensService } from './tokens.service';
import { AuthService } from './auth.service';
import { Tokens } from '../models/token.dto';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private tokenService: TokensService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    const tokens = this.tokenService.getTokens();

    if (tokens != null) {
      authReq = this.addTokenHeader(req, tokens.accessToken);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('auth/login') &&
          error.status === 403
        ) {
          this.authService.changeAuthLoading(false);
          return this.handle403Error(authReq, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const tokens = this.tokenService.getTokens();

      if (tokens)
        return this.authService.refreshToken(tokens.refreshToken).pipe(
          switchMap((newTokens: Tokens) => {
            this.isRefreshing = false;

            this.tokenService.saveTokens(newTokens);
            this.refreshTokenSubject.next(newTokens.accessToken);

            return next.handle(
              this.addTokenHeader(request, newTokens.accessToken)
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.logout().subscribe();
            return throwError(() => err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
