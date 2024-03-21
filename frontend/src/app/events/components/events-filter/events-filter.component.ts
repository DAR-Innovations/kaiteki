import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { CalendarView } from 'angular-calendar'
import { Subject, debounceTime, takeUntil } from 'rxjs'

import { EventsFilter } from '../../pages/models/events-dto.model'

@Component({
	selector: 'app-events-filter',
	templateUrl: './events-filter.component.html',
	styleUrls: ['./events-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsFilterComponent implements OnInit, OnDestroy {
	@Output() filter = new EventEmitter<EventsFilter>()
	private destroy$ = new Subject<void>()

	views = [
		{ id: CalendarView.Month, name: 'Month' },
		{ id: CalendarView.Week, name: 'Week' },
		{ id: CalendarView.Day, name: 'Day' },
	]

	form = new FormGroup({
		view: new FormControl(),
	})

	ngOnInit() {
		this.patchInitialFormValues()
		this.trackFormValueChanges()
	}

	ngOnDestroy() {
		this.destroy$.next()
		this.destroy$.complete()
	}

	private patchInitialFormValues() {
		const initialValues = {
			view: CalendarView.Week,
		}

		this.form.patchValue(initialValues)
		this.filter.emit(initialValues)
	}

	private trackFormValueChanges() {
		this.form.valueChanges
			.pipe(debounceTime(500), takeUntil(this.destroy$))
			.subscribe(form => {
				this.filter.emit({
					view: form.view,
				})
			})
	}
}
