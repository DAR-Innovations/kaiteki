import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs'

import { parseQueryParams } from 'src/app/shared/utils/request-params.util'

import { TeamsService } from 'src/app/teams/services/teams.service'

import {
	MeetingsFilter,
	MeetingsSort,
	MeetingsStatus,
	MeetingsView,
} from '../../models/meetings.types'

const defaultFilter: MeetingsFilter = {
	searchValue: '',
	startDate: undefined,
	endDate: undefined,
	status: undefined,
	view: MeetingsView.LIST,
	sort: MeetingsSort.DATE_DESC,
}

@Component({
	selector: 'app-meetings-filter',
	templateUrl: './meetings-filter.component.html',
	styleUrls: ['./meetings-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsFilterComponent implements OnInit, OnDestroy {
	@Output() filter = new EventEmitter<MeetingsFilter>()
	private destroy$: Subject<void> = new Subject()

	form = new FormGroup({
		searchValue: new FormControl<string>(''),
		startDate: new FormControl<Date | null>(null),
		endDate: new FormControl<Date | null>(null),
		status: new FormControl<MeetingsStatus | null>(null),
		invitedMemberIds: new FormControl<number[]>([]),
		view: new FormControl<MeetingsView | null>(null),
		sort: new FormControl<MeetingsSort | null>(null),
	})

	allTeamMembers$ = this.teamsService.getAllTeamMembers()
	views = [
		{ id: MeetingsView.LIST, label: 'List' },
		{ id: MeetingsView.CALENDAR, label: 'Calendar' },
	]
	sorting = [
		{ id: MeetingsSort.DATE_ASC, label: 'Date ASC' },
		{ id: MeetingsSort.DATE_DESC, label: 'Date DESC' },
	]
	statuses = [
		{ id: MeetingsStatus.IN_PROGRESS, label: 'In Progress' },
		{ id: MeetingsStatus.SCHEDULED, label: 'Scheduled' },
		{ id: MeetingsStatus.COMPLETED, label: 'Completed' },
		{ id: MeetingsStatus.CANCELLED, label: 'Canceled' },
	]

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private teamsService: TeamsService
	) {}

	ngOnInit() {
		this.patchInitialFormValues()
		this.trackFormValueChanges()
	}

	ngOnDestroy() {
		this.destroy$.complete()
	}

	private patchInitialFormValues() {
		const initialFilter: MeetingsFilter = this.getQueryParameters()

		this.form.patchValue({
			searchValue: initialFilter.searchValue,
			view: initialFilter.view,
			sort: initialFilter.sort,
			startDate: initialFilter.startDate
				? new Date(initialFilter.startDate)
				: null,
			endDate: initialFilter.endDate ? new Date(initialFilter.endDate) : null,
			status: initialFilter.status,
		})

		this.filter.emit(initialFilter)
		this.cd.markForCheck()
	}

	private trackFormValueChanges() {
		this.form.valueChanges
			.pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
			.subscribe(form => {
				const filter: MeetingsFilter = {
					searchValue: form.searchValue ?? undefined,
					view: form.view ?? undefined,
					sort: form.sort ?? undefined,
					startDate: form.startDate ? form.startDate.toISOString() : undefined,
					endDate: form.endDate ? form.endDate.toISOString() : undefined,
					status: form.status ?? undefined,
				}

				this.saveQueryParameters(filter)
				this.filter.emit(filter)
			})
	}

	private saveQueryParameters(filter: MeetingsFilter) {
		this.router.navigate([], {
			queryParams: filter,
			queryParamsHandling: 'merge',
		})
	}

	private getQueryParameters() {
		const queryParams = this.route.snapshot.queryParams
		return parseQueryParams<MeetingsFilter>(queryParams, defaultFilter)
	}
}
