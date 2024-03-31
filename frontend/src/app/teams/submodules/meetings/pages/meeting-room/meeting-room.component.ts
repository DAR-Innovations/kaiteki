import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-meeting-room',
	templateUrl: './meeting-room.component.html',
	styleUrls: ['./meeting-room.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingRoomComponent {
	micActive = false
	cameraActive = false
	shareScreenActive = false

	constructor(
		private ngZone: NgZone,
		private route: ActivatedRoute,
		private teamsService: TeamsService,
	) {}

	onToggleMic() {
		this.micActive = !this.micActive
	}

	onToggleCamera() {
		this.cameraActive = !this.cameraActive
	}

	onToggleScreenShare() {
		this.shareScreenActive = !this.shareScreenActive
	}
}
