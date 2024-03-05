import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PLAYLIST_BACKGROUND_COLORS } from '../../constants/playlist-backgrounds'

@Component({
	selector: 'app-spotify-playlist',
	templateUrl: './spotify-playlist.component.html',
	styleUrls: ['./spotify-playlist.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyPlaylistComponent {
	getRandomBackgroundColor() {
		const randomIndex = Math.floor(
			Math.random() * PLAYLIST_BACKGROUND_COLORS.length
		)

		const randomColor = PLAYLIST_BACKGROUND_COLORS[randomIndex]

		return `linear-gradient(to bottom, ${randomColor}, #f8f9fa)`
	}
}
