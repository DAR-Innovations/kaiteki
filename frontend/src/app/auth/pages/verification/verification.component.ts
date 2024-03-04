import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import {
	EMPTY,
	Subject,
	catchError,
	finalize,
	takeUntil,
	tap,
	throwError,
} from 'rxjs'

import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-verification',
	templateUrl: './verification.component.html',
	styleUrls: ['./verification.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>()

	isLoading = true
	isSuccess = false

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.handleToken()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	private handleToken() {
		const token = this.route.snapshot.paramMap.get('token')
		if (!token) return

		this.authService
			.checkEmailVerification(token)
			.pipe(
				tap(() => {
					this.isLoading = true
					this.isSuccess = false
				}),
				catchError(err => {
					this.isSuccess = false
					return throwError(() => err)
				}),
				finalize(() => {
					this.isLoading = false
					this.cd.markForCheck()
				})
			)
			.subscribe(() => {
				this.isSuccess = true
				this.cd.markForCheck()
			})
	}
}
