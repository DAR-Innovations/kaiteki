import { HttpClient } from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'

import {
	BehaviorSubject,
	Observable,
	catchError,
	finalize,
	map,
	switchMap,
	tap,
	throwError,
} from 'rxjs'
import { environment } from 'src/environments/environment'

import { ToastService } from 'src/app/shared/services/toast.service'

import { LoginDTO, SignupDTO } from '../models/auth.dto'
import { Tokens } from '../models/token.dto'
import { Users } from '../models/user.type'

import { TokensService } from './tokens.service'

@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnDestroy {
	private readonly baseURL = `${environment.apiUrl}/api/v1/auth`

	private user = new BehaviorSubject<Users | null>(null)
	private isAuthLoading = new BehaviorSubject<boolean>(true)

	user$ = this.user.asObservable()
	isAuthLoading$ = this.isAuthLoading.asObservable()

	constructor(
		private httpClient: HttpClient,
		private toastService: ToastService,
		private tokensService: TokensService,
		private router: Router,
	) {}

	ngOnDestroy(): void {
		this.user.next(null)
		this.user.complete()

		this.isAuthLoading.next(false)
		this.isAuthLoading.complete()
	}

	login(dto: LoginDTO): Observable<boolean> {
		return this.httpClient.post<Tokens>(`${this.baseURL}/login`, dto).pipe(
			catchError(() => this.handleErrorAndReturnEmpty('Failed to login')),
			map(tokens => this.handleTokens(tokens)),
			switchMap(() => this.autoLogin()),
			tap(result => result && this.router.navigate(['/hub'])),
		)
	}

	signup(dto: SignupDTO): Observable<void> {
		return this.httpClient.post<void>(`${this.baseURL}/register`, dto).pipe(
			catchError(() => this.handleErrorAndReturnEmpty('Failed to signup')),
			tap(() => this.router.navigate(['/auth/verification'])),
		)
	}

	autoLogin(): Observable<boolean> {
		return this.httpClient.get<Users>(`${environment.apiUrl}/api/v1/users/current`).pipe(
			tap(() => this.isAuthLoading.next(true)),
			map(user => this.handleAutoLogin(user)),
			catchError(err => {
				if (err.status !== 401) {
					return this.handleAutoLoginError(err)
				}
				return throwError(() => err)
			}),
			finalize(() => this.isAuthLoading.next(false)),
		)
	}

	logout(): Observable<void> {
		return this.httpClient.post<void>(`${this.baseURL}/logout`, {}).pipe(
			catchError(() => this.handleErrorAndReturnEmpty('Failed to logout')),
			tap(() => {
				localStorage.clear()
				window.location.href = '/'
			}),
		)
	}

	refreshToken(refreshToken: string): Observable<Tokens> {
		return this.httpClient.post<Tokens>(`${this.baseURL}/refresh-token`, {
			refreshToken,
		})
	}

	changeAuthLoading(loading: boolean): void {
		this.isAuthLoading.next(loading)
	}

	checkEmailVerification(token: string) {
		return this.httpClient.post<void>(`${this.baseURL}/verification/${token}`, {})
	}

	private handleTokens(tokens: Tokens | null): boolean {
		if (!tokens) {
			this.toastService.open('Failed to login/signup')
			return false
		}

		this.tokensService.saveTokens(tokens)
		return true
	}

	private handleAutoLogin(user: Users): boolean {
		if (user) {
			this.user.next(user)
			return true
		}

		return false
	}

	private handleAutoLoginError(err: Error): Observable<never> {
		this.isAuthLoading.next(false)

		return throwError(() => err)
	}

	private handleErrorAndReturnEmpty(message: string): Observable<never> {
		this.toastService.open(message)
		return throwError(() => message)
	}
}
