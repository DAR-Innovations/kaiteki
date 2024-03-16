import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SpotifyTrack } from '../../../../models/spotify.model'

@Component({
	selector: 'app-dashboard-track-item',
	templateUrl: './dashboard-track-item.component.html',
	styleUrls: ['./dashboard-track-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTrackItemComponent {
	@Input() track: SpotifyTrack | null = null
}
