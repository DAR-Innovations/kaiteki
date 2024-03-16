import { ChangeDetectionStrategy, Component } from '@angular/core'

import { take } from 'rxjs'

import { SpotifyService } from '../../submodules/spotify/services/spotify.service'

@Component({
	selector: 'app-integrations-list',
	templateUrl: './integrations-list.component.html',
	styleUrls: ['./integrations-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationsListComponent {
	integrations = [
		{
			id: 1,
			name: 'Discord',
			description:
				'Free communications app that lets you share voice, video, and text chat with friends, game communities, and developers.',
			connected: true,
			icon: 'discord',
		},
		{
			id: 2,
			name: 'GitHub',
			description:
				'Code hosting platform for version control and collaboration',
			connected: false,
			icon: 'github',
		},
		// {
		// 	id: 3,
		// 	name: 'Spotify',
		// 	description:
		// 		'Digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world',
		// 	connected: true,
		// 	icon: 'spotify',
		// },
		{
			id: 4,
			name: 'Telegram',
			description:
				'Cloud-based instant messaging app that works across several platforms accessed by people throughout the world.',
			connected: true,
			icon: 'telegram',
		},
	]

	constructor(private spotifyService: SpotifyService) {}

	onSpotifyClick() {
		this.spotifyService
			.getSpotifyLogin()
			.pipe(take(1))
			.subscribe(dto => {
				window.location.replace(dto.loginUrl)
			})
	}
}
