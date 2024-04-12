import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Subject, takeUntil } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { SignupDTO } from '../../models/auth.dto'
import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy {
	slides = [
		{ url: '/assets/images/banners/auth/auth_todos.png' },
		{ url: '/assets/images/banners/auth/auth_integrations.png' },
		{ url: '/assets/images/banners/auth/auth_dashboard.png' },
	]

	private unsubscribe$ = new Subject<void>()

	strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(.{8,})$/
	usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?!-)){0,38}$/

	passwordMatchers = [
		{ label: 'At least uppercase letter', pattern: '^(?=.*[A-Z])' },
		{ label: 'At least one lowercase letter', pattern: '(?=.*[a-z])' },
		{ label: 'At least one digit', pattern: '(.*[0-9].*)' },
		{ label: 'At least one special character', pattern: '(?=.*[!@#$%^&*])' },
		{ label: 'At least 8 characters long', pattern: '.{8,}' },
	]

	usernameMatchers = [
		{ label: 'Starts with a letter or number', pattern: '^[a-zA-Z0-9]' },
		{
			label: 'Contains only letters, numbers, or hyphens',
			pattern: '[a-zA-Z0-9-]*',
		},
		{ label: 'Does not have consecutive hyphens', pattern: '(?!--)' },
		{ label: 'Does not start or end with a hyphen', pattern: '^[^-].*[^-]$' },
		{ label: 'Between 1 and 38 characters long', pattern: '.{1,38}' },
	]

	form = new FormGroup({
		firstname: new FormControl('', [Validators.required, Validators.min(2)]),
		lastname: new FormControl('', [Validators.required, Validators.min(2)]),
		birthDate: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required, Validators.email]),
		username: new FormControl('', [Validators.required, Validators.pattern(this.usernameRegex)]),
		password: new FormControl('', [
			Validators.required,
			Validators.pattern(this.strongPasswordRegex),
		]),
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
		const { username, firstname, lastname, birthDate, email, password } = this.form.getRawValue()

		if (!username || !firstname || !lastname || !birthDate || !email || !password) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: SignupDTO = {
			username: username.trim(),
			firstname: firstname.trim(),
			lastname: lastname.trim(),
			birthDate: new Date(birthDate),
			email: email.trim(),
			password: password.trim(),
		}

		this.authService.signup(dto).pipe(takeUntil(this.unsubscribe$)).subscribe()
	}

	get passwordFormField() {
		return this.form.get('password')
	}

	get usernameFormField() {
		return this.form.get('username')
	}
}
