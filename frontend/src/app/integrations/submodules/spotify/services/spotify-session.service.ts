import {
	HTTP_INTERCEPTORS,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { Observable, catchError, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

@Injectable()
export class SpotifySessionInterceptor implements HttpInterceptor {
	constructor(
		private toastService: ToastService,
		private router: Router,
	) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.url.includes('spotify')) {
			return next.handle(request).pipe(
				catchError(err => {
					if (err?.status === 401) {
						this.router.navigate(['/hub/integrations'])
						this.toastService.error('Spotify integration is not connected')
						return throwError(() => err)
					}

					this.toastService.error('Spotify integration is not available')
					return throwError(() => err)
				}),
			)
		}
		return next.handle(request)
	}
}

export const spotifySessionInterceptorProvider = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: SpotifySessionInterceptor,
		multi: true,
	},
]
