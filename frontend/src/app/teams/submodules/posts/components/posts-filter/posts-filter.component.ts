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

import { PostsFilter } from '../../models/post.dto'

@Component({
	selector: 'app-posts-filter',
	templateUrl: './posts-filter.component.html',
	styleUrls: ['./posts-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFilterComponent implements OnInit, OnDestroy {
	@Output() filter = new EventEmitter<PostsFilter>()
	private destroy$: Subject<void> = new Subject()

	form = new FormGroup({
		searchValue: new FormControl(''),
	})

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.patchInitialFormValues()
		this.trackFormValueChanges()
	}

	ngOnDestroy() {
		this.destroy$.complete()
	}

	private patchInitialFormValues() {
		const initialFilter: PostsFilter = this.getQueryParameters()

		this.form.patchValue({
			searchValue: initialFilter.searchValue,
		})

		this.filter.emit(initialFilter)
		this.cd.detectChanges()
	}

	private trackFormValueChanges() {
		this.form.valueChanges
			.pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
			.subscribe(form => {
				const filter: PostsFilter = {
					searchValue: form.searchValue ?? undefined,
				}

				this.saveQueryParameters(filter)
				this.filter.emit(filter)
			})
	}

	private saveQueryParameters(filter: PostsFilter) {
		this.router.navigate([], {
			queryParams: filter,
			queryParamsHandling: 'merge',
		})
	}

	private getQueryParameters() {
		const defaultFilter: PostsFilter = {
			searchValue: '',
		}

		const queryParams = this.route.snapshot.queryParams
		return parseQueryParams<PostsFilter>(queryParams, defaultFilter)
	}
}
