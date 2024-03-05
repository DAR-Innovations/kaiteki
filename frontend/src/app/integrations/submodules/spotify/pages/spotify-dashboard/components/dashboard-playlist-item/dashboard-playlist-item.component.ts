import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
	selector: 'app-dashboard-playlist-item',
	templateUrl: './dashboard-playlist-item.component.html',
	styleUrls: ['./dashboard-playlist-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPlaylistItemComponent {
	// TODO: Change this any to interface
	@Input() playlist: any = null
}
