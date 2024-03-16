import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Output,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'

import { CalendarView } from 'angular-calendar'
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs'

import { parseQueryParams } from 'src/app/shared/utils/request-params.util'

import { EventsFilter } from '../../pages/models/events-dto.model'

@Component({
	selector: 'app-events-toolbar',
	templateUrl: './events-toolbar.component.html',
	styleUrls: ['./events-toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsToolbarComponent {
	@Output() onFilter = new EventEmitter<EventsFilter>()
	private destroy$ = new Subject<void>()

	views = [
		{ id: CalendarView.Day, name: 'Day' },
		{ id: CalendarView.Week, name: 'Week' },
		{ id: CalendarView.Month, name: 'Month' },
	]

	form = new FormGroup({
		view: new FormControl<CalendarView>(CalendarView.Week),
	})

	constructor(
		private cd: ChangeDetectorRef,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.patchInitialFormValues()
		this.trackFormValueChanges()
	}

	ngOnDestroy() {
		this.destroy$.complete()
	}

	private patchInitialFormValues() {
		const initialFilter: EventsFilter = this.getQueryParameters()

		this.form.patchValue(initialFilter)
		this.onFilter.emit(initialFilter)

		this.cd.markForCheck()
	}

	private trackFormValueChanges() {
		this.form.valueChanges
			.pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
			.subscribe(form => {
				const filter: EventsFilter = {
					view: form.view!,
				}

				this.saveQueryParameters(filter)
				this.onFilter.emit(filter)
			})
	}

	private saveQueryParameters(filter: EventsFilter) {
		this.router.navigate([], {
			queryParams: filter,
			queryParamsHandling: 'merge',
		})
	}

	private getQueryParameters() {
		const defaultFilter: EventsFilter = {
			view: CalendarView.Week,
		}

		const queryParams = this.route.snapshot.queryParams
		return parseQueryParams<EventsFilter>(queryParams, defaultFilter)
	}
}
