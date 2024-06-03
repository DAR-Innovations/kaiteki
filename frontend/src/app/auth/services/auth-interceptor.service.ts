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

import { catchError } from 'rxjs/operators'

import { Observable, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private toastService: ToastService,
		private router: Router,
	) {}

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this.handle401Error()
				} else if (error.status === 403) {
					this.toastService.error('Your session is expired. Please login again.')
					localStorage.clear()
					this.authService.logout()
				}
				return throwError(() => error)
			}),
		)
	}

	private handle401Error() {
		const url = this.router.url

		this.toastService.error('Session expired. Please log in again.')
		if (url.startsWith('/hub')) {
			this.router.navigate(['/'])
			this.toastService.error('You must be logged in to access this page.')
		}
		this.authService.logout()
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]
