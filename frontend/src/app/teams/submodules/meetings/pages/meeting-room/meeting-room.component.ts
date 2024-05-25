import { DOCUMENT } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { ChangeDetectionStrategy, Component, Inject, NgZone, OnInit } from '@angular/core'

import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded'
import { catchError, take, throwError } from 'rxjs'

@Component({
	selector: 'app-meeting-room',
	templateUrl: './meeting-room.component.html',
	styleUrls: ['./meeting-room.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingRoomComponent implements OnInit {
	authEndpoint = '/api/v1/integrations/zoom/signature'
	sdkKey = 'ng0qZrRkSHWkn1dVSs9jqQ'
	meetingNumber = 123456789
	passWord = ''
	role = 0
	userName = 'Diar Begisbayev'
	userEmail = 'begisbyev@gmail.com'
	registrantToken = ''
	zakToken = ''
	leaveUrl = 'http://localhost:4200/hub/teams/9/meetings'

	client = ZoomMtgEmbedded.createClient()

	constructor(
		public httpClient: HttpClient,
		@Inject(DOCUMENT) document: Document,
		private ngZone: NgZone,
	) {}

	ngOnInit() {
		console.log('init')
	}

	getSignature() {
		this.httpClient
			.post<{ signature: string }>(this.authEndpoint, {
				meetingRoomId: this.meetingNumber,
				role: this.role,
			})
			.pipe(
				take(1),
				catchError(err => throwError(() => err)),
			)
			.subscribe(data => {
				if (data?.signature) {
					this.startMeeting(data.signature)
				}
			})
	}

	startMeeting(signature: string) {
		const meetingSDKElement = document.getElementById('meetingSDKElement')

		this.ngZone.runOutsideAngular(() => {
			this.client
				.init({
					zoomAppRoot: meetingSDKElement ?? undefined,
					language: 'en-US',
					patchJsMedia: true,
				})
				.then(() => {
					this.client
						.join({
							signature: signature,
							sdkKey: this.sdkKey,
							meetingNumber: this.meetingNumber.toString(),
							password: this.passWord,
							userName: this.userName,
							userEmail: this.userEmail,
							tk: this.registrantToken,
							zak: this.zakToken,
						})
						.then(() => {
							console.log('joined successfully')
						})
						.catch(error => {
							console.log(error)
						})
				})
				.catch(error => {
					console.log(error)
				})
		})
	}

	// micActive = false
	// cameraActive = false
	// shareScreenActive = false
	// private unsubscribe$ = new Subject<void>()
	// currentMeetingRoom$ = this.meetingsService.currentMeetingRoom$
	// meetingRoomState = {
	// 	isLoading: true,
	// 	isError: false,
	// 	errorMessage: '',
	// }
	// constructor(
	// 	private ngZone: NgZone,
	// 	private route: ActivatedRoute,
	// 	private teamsService: TeamsService,
	// 	private toastService: ToastService,
	// 	private cd: ChangeDetectorRef,
	// 	private meetingsService: MeetingsService,
	// ) {}
	// ngOnInit() {
	// 	this.loadMeetingFromParams()
	// }
	// private loadMeetingFromParams() {
	// 	this.route.paramMap
	// 		.pipe(
	// 			tap(() => (this.meetingRoomState.isLoading = true)),
	// 			catchError(err => {
	// 				this.handleError(err)
	// 				return throwError(() => err)
	// 			}),
	// 			takeUntil(this.unsubscribe$),
	// 		)
	// 		.subscribe(params => {
	// 			const meetingIdParam = params.get('meetingId')
	// 			if (!meetingIdParam) {
	// 				this.handleError('Invalid meeting ID')
	// 				return
	// 			}
	// 			const meetingIdNumber = Number(meetingIdParam)
	// 			if (isNaN(meetingIdNumber)) {
	// 				this.handleError('Invalid meeting ID')
	// 				return
	// 			}
	// 			this.meetingsService
	// 				.getMeeting(meetingIdNumber)
	// 				.pipe(
	// 					tap(() => (this.meetingRoomState.isLoading = false)),
	// 					catchError(err => {
	// 						this.handleError(err)
	// 						return throwError(() => err)
	// 					}),
	// 					takeUntil(this.unsubscribe$),
	// 				)
	// 				.subscribe(meetingRoom => {
	// 					this.meetingsService.setCurrentMeetingRoom(meetingRoom)
	// 					this.cd.markForCheck()
	// 				})
	// 		})
	// }
	// handleError(error: string) {
	// 	this.meetingRoomState.isLoading = false
	// 	this.meetingRoomState.isError = true
	// 	this.meetingRoomState.errorMessage = error
	// 	this.toastService.open('Failed to get team')
	// 	this.cd.markForCheck()
	// }
	// onToggleMic() {
	// 	this.micActive = !this.micActive
	// }
	// onToggleCamera() {
	// 	this.cameraActive = !this.cameraActive
	// }
	// onToggleScreenShare() {
	// 	this.shareScreenActive = !this.shareScreenActive
	// }
	// onLeaveMeeting() {
	// 	throw new Error('Method not implemented.')
	// }
}
