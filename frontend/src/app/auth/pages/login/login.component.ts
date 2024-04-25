import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Subject, takeUntil } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { AuthService } from '../../services/auth.service'

import { LoginDTO } from './../../models/auth.dto'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
	slides = [
		{ url: '/assets/images/banners/auth/auth_todos.png' },
		{ url: '/assets/images/banners/auth/auth_integrations.png' },
		{ url: '/assets/images/banners/auth/auth_dashboard.png' },
	]
	private unsubscribe$ = new Subject<void>()

	form = new FormGroup({
		emailOrUsername: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	})

	constructor(
		private authService: AuthService,
		private toastService: ToastService,
	) {}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	onSubmit() {
		const { emailOrUsername, password } = this.form.getRawValue()

		if (!emailOrUsername || !password) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: LoginDTO = {
			emailOrUsername: emailOrUsername,
			password: password,
		}

		this.authService.login(dto).pipe(takeUntil(this.unsubscribe$)).subscribe()
	}
}
