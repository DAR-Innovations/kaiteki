import { ChangeDetectionStrategy, Component } from '@angular/core'

import { SpotifyService } from '../../services/spotify.service'

const categoriesIds = {
	newReleases: '0JQ5DAqbMKFz6FAsUtgAab',
	chill: '0JQ5DAqbMKFFzDl7qN9Apr',
	trending: '0JQ5DAqbMKFQIL0AXnG5AK',
}

@Component({
	selector: 'app-spotify-dashboard',
	templateUrl: './spotify-dashboard.component.html',
	styleUrls: ['./spotify-dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyDashboardComponent {
	savedPlaylists$ = this.spotifyService.getUsersSavedPlaylists()
	chillPlaylists$ = this.spotifyService.getPlaylistsByCategory(categoriesIds.chill)
	trendingPlaylists$ = this.spotifyService.getPlaylistsByCategory(categoriesIds.trending)

	constructor(private spotifyService: SpotifyService) {}
}
