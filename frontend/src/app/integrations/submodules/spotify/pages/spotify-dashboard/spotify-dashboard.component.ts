import { ChangeDetectionStrategy, Component } from '@angular/core'

import { combineLatest, map } from 'rxjs'

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
	playlists$ = combineLatest([
		this.spotifyService.getUsersSavedPlaylists(),
		this.spotifyService.getPlaylistsByCategory(categoriesIds.chill),
		this.spotifyService.getPlaylistsByCategory(categoriesIds.trending),
	]).pipe(
		map(([savedPlaylists, chillPlaylists, trendingPlaylists]) => {
			return { savedPlaylists, chillPlaylists, trendingPlaylists }
		}),
	)

	constructor(private spotifyService: SpotifyService) {}
}
