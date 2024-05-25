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

import { TeamFilesFilter } from '../../models/team-files.dto'

@Component({
	selector: 'app-files-filter',
	templateUrl: './files-filter.component.html',
	styleUrls: ['./files-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesFilterComponent implements OnInit, OnDestroy {
	@Output() filter = new EventEmitter<TeamFilesFilter>()
	private destroy$ = new Subject<void>()

	views = [
		{ id: 'list', name: 'List' },
		{ id: 'table', name: 'Table' },
	]
	sorting = [
		{ id: 'createdAt,asc', name: 'Date ↗' },
		{ id: 'createdAt,desc', name: 'Date ↘' },
	]

	form = new FormGroup({
		searchValue: new FormControl(''),
		view: new FormControl(''),
		sort: new FormControl(''),
	})

	constructor(
		private cd: ChangeDetectorRef,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.patchInitialFormValues()
		this.trackFormValueChanges()
	}

	ngOnDestroy() {
		this.destroy$.next()
		this.destroy$.complete()
	}

	private patchInitialFormValues() {
		const initialFilter: TeamFilesFilter = this.getQueryParameters()

		this.form.patchValue({
			searchValue: initialFilter.searchValue,
			view: initialFilter.view,
			sort: initialFilter.sort,
		})

		this.filter.emit(initialFilter)
		this.cd.markForCheck()
	}

	private trackFormValueChanges() {
		this.form.valueChanges
			.pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
			.subscribe(form => {
				const filter: TeamFilesFilter = {
					searchValue: form.searchValue ?? undefined,
					view: form.view ?? undefined,
					sort: form.sort ?? undefined,
				}

				this.saveQueryParameters(filter)
				this.filter.emit(filter)
			})
	}

	private saveQueryParameters(filter: TeamFilesFilter) {
		this.router.navigate([], {
			queryParams: filter,
			queryParamsHandling: 'merge',
		})
	}

	private getQueryParameters() {
		const defaultFilter: TeamFilesFilter = {
			searchValue: '',
			view: this.views[0].id,
			sort: this.sorting[1].id,
		}

		const queryParams = this.route.snapshot.queryParams
		return parseQueryParams<TeamFilesFilter>(queryParams, defaultFilter)
	}
}
