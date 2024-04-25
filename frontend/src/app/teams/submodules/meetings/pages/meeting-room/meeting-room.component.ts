import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	NgZone,
	OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject, catchError, takeUntil, tap, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { MeetingsService } from '../../services/meetings.service'

@Component({
	selector: 'app-meeting-room',
	templateUrl: './meeting-room.component.html',
	styleUrls: ['./meeting-room.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingRoomComponent implements OnInit {
	micActive = false
	cameraActive = false
	shareScreenActive = false

	private unsubscribe$ = new Subject<void>()
	currentMeetingRoom$ = this.meetingsService.currentMeetingRoom$
	meetingRoomState = {
		isLoading: true,
		isError: false,
		errorMessage: '',
	}

	constructor(
		private ngZone: NgZone,
		private route: ActivatedRoute,
		private teamsService: TeamsService,
		private toastService: ToastService,
		private cd: ChangeDetectorRef,
		private meetingsService: MeetingsService,
	) {}

	ngOnInit() {
		this.loadMeetingFromParams()
	}

	private loadMeetingFromParams() {
		this.route.paramMap
			.pipe(
				tap(() => (this.meetingRoomState.isLoading = true)),
				catchError(err => {
					this.handleError(err)
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$),
			)
			.subscribe(params => {
				const meetingIdParam = params.get('meetingId')
				if (!meetingIdParam) {
					this.handleError('Invalid meeting ID')
					return
				}

				const meetingIdNumber = Number(meetingIdParam)
				if (isNaN(meetingIdNumber)) {
					this.handleError('Invalid meeting ID')
					return
				}

				this.meetingsService
					.getMeeting(meetingIdNumber)
					.pipe(
						tap(() => (this.meetingRoomState.isLoading = false)),
						catchError(err => {
							this.handleError(err)
							return throwError(() => err)
						}),
						takeUntil(this.unsubscribe$),
					)
					.subscribe(meetingRoom => {
						this.meetingsService.setCurrentMeetingRoom(meetingRoom)
						this.cd.markForCheck()
					})
			})
	}

	handleError(error: string) {
		this.meetingRoomState.isLoading = false
		this.meetingRoomState.isError = true
		this.meetingRoomState.errorMessage = error
		this.toastService.open('Failed to get team')
		this.cd.markForCheck()
	}

	onToggleMic() {
		this.micActive = !this.micActive
	}

	onToggleCamera() {
		this.cameraActive = !this.cameraActive
	}

	onToggleScreenShare() {
		this.shareScreenActive = !this.shareScreenActive
	}

	onLeaveMeeting() {
		throw new Error('Method not implemented.')
	}
}
