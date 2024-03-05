import { ChangeDetectionStrategy, Component } from '@angular/core'

import { catchError, map, startWith, switchMap, tap, throwError } from 'rxjs'

import { InitialPaginationValue } from 'src/app/shared/components/paginator/paginator.component'
import {
	PageableDTO,
	PageableRequest,
} from 'src/app/shared/models/pagination.model'
import { ToastService } from 'src/app/shared/services/toastr.service'

import { MeetingsFilter, MeetingsView } from '../../models/meetings.types'
import { MeetingsService } from '../../services/meetings.service'

@Component({
	selector: 'app-meetings',
	templateUrl: './meetings.component.html',
	styleUrls: ['./meetings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsComponent {
	meetingsViews = MeetingsView
	filter: MeetingsFilter = {}
	pagination: PageableDTO = InitialPaginationValue

	meetings$ = this.meetingService.refetchMeetings$.pipe(
		startWith([]),
		switchMap(() => this.loadMeetings())
	)

	constructor(
		private meetingService: MeetingsService,
		private toastrService: ToastService
	) {}

	ngOnInit(): void {
		this.meetingService.refetchMeetings()
	}

	private loadMeetings() {
		const pageable: PageableRequest = {
			size: this.pagination.size,
			page: this.pagination.page,
		}

		return this.meetingService.getMeetings(this.filter, pageable).pipe(
			tap(res => {
				this.pagination.page = res.number
				this.pagination.size = res.size
				this.pagination.totalElements = res.totalElements
				this.pagination.totalPages = res.totalPages
			}),
			map(res => res.content),
			catchError(err => {
				this.toastrService.open('Failed to get meetings')
				return throwError(() => err)
			})
		)
	}

	onPage(page: PageableRequest) {
		this.pagination.size = page.size
		this.pagination.page = page.page
		this.meetingService.refetchMeetings()
	}

	onFilter(filter: MeetingsFilter) {
		this.filter = filter
		this.meetingService.refetchMeetings()
	}
}
