import { ChangeDetectionStrategy, Component } from '@angular/core'

import { catchError, map, switchMap, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { DEFAULT_INTEGRATIONS } from '../../models/default-integrations'
import { SpotifyService } from '../../submodules/spotify/services/spotify.service'
import { IntegrationsService } from '../services/integrations.service'

@Component({
	selector: 'app-integrations-list',
	templateUrl: './integrations-list.component.html',
	styleUrls: ['./integrations-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationsListComponent {
	integrations$ = this.integrationsService.integrations$.pipe(
		switchMap(() => this.loadIntegrations()),
	)

	constructor(
		private spotifyService: SpotifyService,
		private integrationsService: IntegrationsService,
		private toastService: ToastService,
	) {}

	private loadIntegrations() {
		return this.integrationsService.getUserIntegrations().pipe(
			map(integrations => {
				return [
					{
						...DEFAULT_INTEGRATIONS.github,
						connected: integrations.github?.enabled ?? false,
						onConnect: () => console.log('Connect GitHub'),
						onDisconnect: () => console.log('Disconnect GitHub'),
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
						onConnect: () => console.log('Connect Telegram'),
						onDisconnect: () => console.log('Disconnect Telegram'),
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
}
