import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'

import { catchError, map, startWith, switchMap, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { DEFAULT_INTEGRATIONS } from '../../models/default-integrations'
import { IntegrationsService } from '../../services/integrations.service'
import { GithubService } from '../../submodules/github/services/github.service'
import { SpotifyService } from '../../submodules/spotify/services/spotify.service'
import { TelegramService } from '../../submodules/telegram/services/telegram.service'

@Component({
	selector: 'app-integrations-list',
	templateUrl: './integrations-list.component.html',
	styleUrls: ['./integrations-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationsListComponent {
	integrations$ = this.integrationsService.integrations$.pipe(
		startWith([]),
		switchMap(() => this.loadIntegrations()),
	)

	constructor(
		private spotifyService: SpotifyService,
		private telegramService: TelegramService,
		private integrationsService: IntegrationsService,
		private toastService: ToastService,
		private githubService: GithubService,
		private router: Router,
	) {}

	private loadIntegrations() {
		return this.integrationsService.getUserIntegrations().pipe(
			map(integrations => {
				return [
					{
						...DEFAULT_INTEGRATIONS.github,
						connected: integrations.github?.enabled ?? false,
						onConnect: () => this.onGitHubConnect(),
						onDisconnect: () => this.onGitHubDisconnect(),
					},
					{
						...DEFAULT_INTEGRATIONS.spotify,
						connected: integrations.spotify?.enabled ?? false,
						onConnect: () => this.onSpotifyConnect(),
						onDisconnect: () => this.onSpotifyDisconnect(),
					},
					{
						...DEFAULT_INTEGRATIONS.telegram,
						connected: integrations.telegram?.enabled ?? false,
						onConnect: () => this.onTelegramConnect(),
						onDisconnect: () => this.onTelegramDisconnect(),
					},
				]
			}),
			catchError(err => {
				this.toastService.error('Failed to get integrations')
				return throwError(() => err)
			}),
		)
	}

	onSpotifyConnect() {
		this.spotifyService
			.getConnectIntegrationUrl()
			.pipe(take(1))
			.subscribe(dto => {
				window.location.replace(dto.loginUrl)
			})
	}

	onSpotifyDisconnect() {
		this.spotifyService
			.disconnectSpotifyIntegration()
			.pipe(
				take(1),
				catchError(err => {
					this.toastService.error('Failed to disconnect Spotify')
					return throwError(() => err)
				}),
			)
			.subscribe(() => {
				this.toastService.open('Spotify integration disconnected!')
				this.integrationsService.refreshIntegrations()
			})
	}

	onTelegramConnect() {
		this.telegramService
			.connectIntegration()
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to connect Telegram')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Telegram integration connected!')
				this.integrationsService.refreshIntegrations()
				this.router.navigate(['/hub/integrations/telegram'])
			})
	}

	onTelegramDisconnect() {
		this.telegramService
			.disconnectIntegration()
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to disconnect Telegram')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Telegram integration disconnected!')
				this.integrationsService.refreshIntegrations()
			})
	}

	onGitHubConnect() {
		this.githubService
			.connectIntegration()
			.pipe(
				take(1),
				catchError(err => {
					this.toastService.error('Failed to connect GitHub integration')
					return throwError(() => err)
				}),
			)
			.subscribe(() => {
				this.toastService.open('GitHub integration connected!')
				this.integrationsService.refreshIntegrations()
				this.router.navigate(['/hub/integrations/github'])
			})
	}

	onGitHubDisconnect() {
		this.githubService
			.disconnectIntegration()
			.pipe(
				take(1),
				catchError(err => {
					this.toastService.error('Failed to disconnect GitHub integration')
					return throwError(() => err)
				}),
			)
			.subscribe(() => {
				this.toastService.open('GitHub integration disconnected!')
				this.integrationsService.refreshIntegrations()
			})
	}
}
