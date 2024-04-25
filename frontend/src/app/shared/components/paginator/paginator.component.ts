import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { ActivatedRoute, Router } from '@angular/router'

import { distinctUntilChanged, takeUntil } from 'rxjs/operators'

import { Observable, Subject } from 'rxjs'

import { PageableDTO, PageableRequest } from '../../models/pagination.model'
import { createQueryParamsOnFilter, parseQueryParams } from '../../utils/request-params.util'

export const InitialPaginationValue: PageableDTO = {
	size: 5,
	totalPages: 1,
	totalElements: 5,
	page: 0,
}

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>()
	private _pagination: PageableDTO = InitialPaginationValue

	@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
	@Output() page = new EventEmitter<PageableRequest>()
	@Input() resetFormSubject: Observable<boolean> = new Observable<boolean>()

	@Input() set pagination(value: PageableDTO) {
		this._pagination.totalElements = value.totalElements
		this._pagination.totalPages = value.totalPages
		this._pagination.page = value.page
		this._pagination.size = value.size

		if (value.page === 0) {
			this.paginator.firstPage()
		}
	}

	get pagination(): PageableDTO {
		return this._pagination
	}

	constructor(
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.patchInitialFormValues()
		this.trackFormValueChanges()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	private patchInitialFormValues() {
		const initialFilter: PageableRequest = this.getQueryParameters()

		this._pagination.size = initialFilter.size
		this._pagination.page = initialFilter.page
		this.page.emit({
			size: Number(initialFilter.size),
			page: Number(initialFilter.page),
		})
	}

	private trackFormValueChanges() {
		this.paginator.page
			.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
			.subscribe(value => {
				const pageable: PageableRequest = {
					size: value.pageSize,
					page: value.pageIndex,
				}

				this.saveQueryParameters(pageable)
				this.page.emit(pageable)
			})
	}

	private saveQueryParameters(filter: PageableRequest) {
		this.router.navigate([], {
			queryParams: createQueryParamsOnFilter(filter),
			queryParamsHandling: 'merge',
		})
	}

	private getQueryParameters() {
		const defaultFilter: PageableRequest = {
			...InitialPaginationValue,
		}

		const queryParams = this.route.snapshot.queryParams
		return parseQueryParams<PageableRequest>(queryParams, defaultFilter)
	}
}
