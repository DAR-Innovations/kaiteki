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

import { catchError, mergeMap, switchMap, take } from 'rxjs/operators'

import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { Tokens } from '../models/token.dto'

import { AuthService } from './auth.service'
import { TokensService } from './tokens.service'

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private isRefreshing = false
	private refreshTokenSubject = new BehaviorSubject<string | null>(null)

	constructor(
		private tokenService: TokensService,
		private authService: AuthService,
		private toastService: ToastService,
		private router: Router,
	) {}

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let authReq = req
		const tokens = this.tokenService.getTokens()

		if (tokens) {
			authReq = this.addTokenHeader(req, tokens.accessToken)
		}

		return next.handle(authReq).pipe(
			catchError((error: { status: number }) => {
				if (error.status === 403 && !req.url.includes('users/current')) {
					this.router
						.navigate(['/'])
						.then(() => this.toastService.open('Available only to authorized users'))
				} else if (error instanceof HttpErrorResponse && error.status === 403) {
					return this.handle403Error(authReq, next)
				}

				return throwError(() => error)
			}),
		)
	}

	private handle403Error(
		request: HttpRequest<unknown>,
		next: HttpHandler,
	): Observable<HttpEvent<unknown>> {
		if (!this.isRefreshing) {
			this.isRefreshing = true
			this.refreshTokenSubject.next(null)

			const tokens = this.tokenService.getTokens()

			return tokens
				? this.authService.refreshToken(tokens.refreshToken).pipe(
						switchMap((newTokens: Tokens) => {
							this.isRefreshing = false
							this.tokenService.saveTokens(newTokens)
							this.refreshTokenSubject.next(newTokens.accessToken)
							return next.handle(this.addTokenHeader(request, newTokens.accessToken))
						}),
						catchError(() => {
							this.isRefreshing = false
							this.authService.logout().subscribe()
							this.toastService.open('Session expired, please log in again')
							this.router.navigate(['/']) // Redirect to login page after logout
							return EMPTY // Terminate observable sequence
						}),
					)
				: EMPTY.pipe(
						mergeMap(() => {
							this.router.navigate(['/'])
							return EMPTY
						}),
					)
		} else {
			return this.refreshTokenSubject.pipe(
				take(1),
				switchMap(token => {
					if (!token) {
						return EMPTY
					}

					return next.handle(this.addTokenHeader(request, token))
				}),
			)
		}
	}

	private addTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
		return request.clone({
			headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
		})
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]
