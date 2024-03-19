import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SpotifyPlaylistSimplified } from '../../../../models/spotify.model'

@Component({
	selector: 'app-dashboard-playlist-item',
	templateUrl: './dashboard-playlist-item.component.html',
	styleUrls: ['./dashboard-playlist-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPlaylistItemComponent {
	// TODO: Change this any to interface
	@Input() playlist: SpotifyPlaylistSimplified | null = null
}
