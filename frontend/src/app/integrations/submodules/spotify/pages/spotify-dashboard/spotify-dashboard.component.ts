import { ChangeDetectionStrategy, Component } from '@angular/core'

import { of } from 'rxjs'

import { SpotifyService } from '../../services/spotify.service'

@Component({
	selector: 'app-spotify-dashboard',
	templateUrl: './spotify-dashboard.component.html',
	styleUrls: ['./spotify-dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyDashboardComponent {
	playlists$ = of([
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
		{
			id: 1,
			title: "Today's Top Hits",
			description: 'Olivia Rodrigo is on top of the Hottest 50!',
		},
	])

	topTracks$ = this.spotifyService.getUserTopTracks()

	constructor(private spotifyService: SpotifyService) {}
}
