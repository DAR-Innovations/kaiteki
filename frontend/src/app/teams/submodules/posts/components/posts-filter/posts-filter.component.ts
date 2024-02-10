import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { PostsFilter } from '../../models/post.dto';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createQueryParamsOnFilter,
  parseQueryParams,
} from 'src/app/shared/utils/request-params.util';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFilterComponent {
  @Output() onFilter = new EventEmitter<PostsFilter>();
  private destroy$: Subject<void> = new Subject();

  form = new FormGroup({
    searchValue: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.patchInitialFormValues();
    this.trackFormValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  private patchInitialFormValues() {
    const initialFilter: PostsFilter = this.getQueryParameters();

    this.form.patchValue({
      searchValue: initialFilter.searchValue,
    });

    this.onFilter.emit(initialFilter);
    this.cd.detectChanges();
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((form) => {
        const filter: PostsFilter = {
          searchValue: form.searchValue ?? undefined,
        };

        this.saveQueryParamters(filter);
        this.onFilter.emit(filter);
      });
  }

  private saveQueryParamters(filter: PostsFilter) {
    this.router.navigate([], {
      queryParams: createQueryParamsOnFilter(filter),
    });
  }

  private getQueryParameters() {
    const defaultFilter: Partial<PostsFilter> = {
      searchValue: '',
    };

    const queryParams = this.route.snapshot.queryParams;
    return parseQueryParams<PostsFilter>(queryParams, defaultFilter);
  }
}
