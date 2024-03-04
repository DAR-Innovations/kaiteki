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

import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators'

import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs'

import { ToastrService } from 'src/app/shared/services/toastr.service'

import { AuthService } from './auth.service'
import { TokensService } from './tokens.service'

// Import Router for navigation

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private isRefreshing = false
	private refreshTokenSubject = new BehaviorSubject<any>(null)

	constructor(
		private tokenService: TokensService,
		private authService: AuthService,
		private toastrService: ToastrService,
		private router: Router
	) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let authReq = req
		const tokens = this.tokenService.getTokens()

		if (tokens) {
			authReq = this.addTokenHeader(req, tokens.accessToken)
		}

		return next.handle(authReq).pipe(
			catchError((error: any) => {
				if (error.status === 403 && !req.url.includes('users/current')) {
					this.router
						.navigate(['/'])
						.then(() =>
							this.toastrService.open('Available only to authorized users')
						)
				} else if (error instanceof HttpErrorResponse && error.status === 403) {
					return this.handle403Error(authReq, next)
				}

				return throwError(() => error)
			})
		)
	}

	private handle403Error(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!this.isRefreshing) {
			this.isRefreshing = true
			this.refreshTokenSubject.next(null)

			const tokens = this.tokenService.getTokens()

			return tokens
				? this.authService.refreshToken(tokens.refreshToken).pipe(
						switchMap((newTokens: any) => {
							this.isRefreshing = false
							this.tokenService.saveTokens(newTokens)
							this.refreshTokenSubject.next(newTokens.accessToken)
							return next.handle(
								this.addTokenHeader(request, newTokens.accessToken)
							)
						}),
						catchError((err: any) => {
							this.isRefreshing = false
							this.authService.logout().subscribe()
							this.toastrService.open('Session expired, please log in again')
							this.router.navigate(['/']) // Redirect to login page after logout
							return EMPTY // Terminate observable sequence
						})
					)
				: EMPTY.pipe(
						mergeMap(() => {
							// Redirect if no tokens are available
							this.router.navigate(['/'])
							return EMPTY
						})
					)
		} else {
			return this.refreshTokenSubject.pipe(
				filter(token => token !== null),
				take(1),
				switchMap(token => next.handle(this.addTokenHeader(request, token)))
			)
		}
	}

	private addTokenHeader(
		request: HttpRequest<any>,
		token: string
	): HttpRequest<any> {
		return request.clone({
			headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
		})
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]
