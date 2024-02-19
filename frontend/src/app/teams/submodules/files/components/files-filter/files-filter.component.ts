import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TeamFilesFilter } from '../../models/team-files.dto';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createQueryParamsOnFilter,
  parseQueryParams,
} from 'src/app/shared/utils/request-params.util';

@Component({
  selector: 'app-files-filter',
  templateUrl: './files-filter.component.html',
  styleUrls: ['./files-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesFilterComponent {
  @Output() onFilter = new EventEmitter<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  views: any[] = [
    { id: 'list', name: 'List' },
    { id: 'table', name: 'Table' },
  ];
  sortings: any[] = [
    { id: 'createdDate,asc', name: 'Date ASC' },
    { id: 'createdDate,desc', name: 'Date DESC' },
  ];

  form = new FormGroup({
    searchValue: new FormControl(''),
    view: new FormControl(''),
    sort: new FormControl(''),
  });

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.patchInitialFormValues();
    this.trackFormValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  private patchInitialFormValues() {
    const initialFilter: TeamFilesFilter = this.getQueryParameters();

    this.form.patchValue({
      searchValue: initialFilter.searchValue,
      view: initialFilter.view,
      sort: initialFilter.sort,
    });

    this.onFilter.emit(initialFilter);
    this.cd.detectChanges();
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((form) => {
        const filter: TeamFilesFilter = {
          searchValue: form.searchValue ?? undefined,
          view: form.view ?? undefined,
          sort: form.sort ?? undefined,
        };

        this.saveQueryParamters(filter);
        this.onFilter.emit(filter);
      });
  }

  private saveQueryParamters(filter: TeamFilesFilter) {
    this.router.navigate([], {
      queryParams: createQueryParamsOnFilter(filter),
      queryParamsHandling: 'merge',
    });
  }

  private getQueryParameters() {
    const defaultFilter: TeamFilesFilter = {
      searchValue: '',
      view: this.views[0].id,
      sort: this.sortings[1].id,
    };

    const queryParams = this.route.snapshot.queryParams;
    return parseQueryParams<TeamFilesFilter>(queryParams, defaultFilter);
  }
}
