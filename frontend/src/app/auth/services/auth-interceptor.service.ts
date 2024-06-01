import {
	HTTP_INTERCEPTORS,
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { catchError, switchMap } from 'rxjs/operators'

import { Observable, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { Tokens } from '../models/token.dto'

import { AuthService } from './auth.service'
import { TokensService } from './tokens.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private toastService: ToastService,
		private tokensService: TokensService,
		private router: Router,
	) {}

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.tokensService.getTokens()

		let authReq = req
		if (token?.accessToken) {
			authReq = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${token.accessToken}`),
			})
		}

		return next.handle(authReq).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					return this.handle401Error(authReq, next, token?.refreshToken)
				} else if (error.status === 403) {
					this.toastService.error('Your sessions is expired. Please login again.')
					localStorage.clear()
				}
				return throwError(() => error)
			}),
		)
	}

	private handle401Error(
		request: HttpRequest<unknown>,
		next: HttpHandler,
		refreshToken: string | undefined,
	) {
		const url = this.router.url

		if (!refreshToken) {
			if (!request.url.includes('/users/current')) {
				this.toastService.error('Session expired. Please log in again.')
			}
			if (url.startsWith('/hub')) {
				this.router.navigate(['/'])
				this.toastService.error('You must be logged in to access this page.')
			}
			this.authService.logout()
			return throwError(() => new Error('Refresh token not available'))
		}

		return this.authService.refreshToken(refreshToken).pipe(
			switchMap((newToken: Tokens) => {
				this.tokensService.saveTokens(newToken)
				const clonedRequest = request.clone({
					headers: request.headers.set('Authorization', `Bearer ${newToken.accessToken}`),
				})
				return next.handle(clonedRequest)
			}),
			catchError((error: unknown) => {
				if (!request.url.includes('/users/current')) {
					this.toastService.error('Session expired. Please log in again.')
				}
				if (url.startsWith('/hub')) {
					this.router.navigate(['/'])
					this.toastService.error('You must be logged in to access this page.')
				}
				this.authService.logout()
				return throwError(() => error)
			}),
		)
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]
