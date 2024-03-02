import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import {
  MeetingsFilter,
  MeetingsSort,
  MeetingsStatus,
  MeetingsView,
} from '../../models/meetings.types';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createQueryParamsOnFilter,
  parseQueryParams,
} from 'src/app/shared/utils/request-params.util';
import { TeamsService } from 'src/app/teams/services/teams.service';

const defaultFilter: MeetingsFilter = {
  searchValue: '',
  startDate: undefined,
  endDate: undefined,
  status: undefined,
  invitedMemberIds: [],
  view: MeetingsView.LIST,
  sort: MeetingsSort.DATE_DESC,
};

@Component({
  selector: 'app-meetings-filter',
  templateUrl: './meetings-filter.component.html',
  styleUrls: ['./meetings-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsFilterComponent {
  @Output() onFilter = new EventEmitter<MeetingsFilter>();
  private destroy$: Subject<void> = new Subject();

  form = new FormGroup({
    searchValue: new FormControl<string | undefined>(''),
    startDate: new FormControl<Date | undefined>(undefined),
    endDate: new FormControl<Date | undefined>(undefined),
    status: new FormControl<MeetingsStatus | undefined>(undefined),
    invitedMemberIds: new FormControl<number[] | undefined>(undefined),
    view: new FormControl<MeetingsView | undefined>(undefined),
    sort: new FormControl<MeetingsSort | undefined>(undefined),
  });

  allTeamMembers$ = this.teamsService.getAllTeamMembers();
  views = [
    { id: MeetingsView.LIST, label: 'List' },
    { id: MeetingsView.LIST, label: 'Table' },
  ];
  sortings = [
    { id: MeetingsSort.DATE_ASC, label: 'Date ASC' },
    { id: MeetingsSort.DATE_DESC, label: 'Date DESC' },
  ];
  statuses = [
    { id: MeetingsStatus.IN_PROGRESS, label: 'In Progress' },
    { id: MeetingsStatus.SCHEDULED, label: 'Scheduled' },
    { id: MeetingsStatus.COMPLETED, label: 'Completed' },
    { id: MeetingsStatus.CANCELLED, label: 'Canceled' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private teamsService: TeamsService
  ) {}

  ngOnInit() {
    this.patchInitialFormValues();
    this.trackFormValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  private patchInitialFormValues() {
    const initialFilter: MeetingsFilter = this.getQueryParameters();

    this.form.patchValue({
      searchValue: initialFilter.searchValue,
      startDate: initialFilter.startDate,
      endDate: initialFilter.endDate,
      status: initialFilter.status,
      invitedMemberIds: initialFilter.invitedMemberIds,
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
        const filter: MeetingsFilter = {
          searchValue: form.searchValue ?? undefined,
        };

        this.saveQueryParamters(filter);
        this.onFilter.emit(filter);
      });
  }

  private saveQueryParamters(filter: MeetingsFilter) {
    this.router.navigate([], {
      queryParams: createQueryParamsOnFilter(filter),
      queryParamsHandling: 'merge',
    });
  }

  private getQueryParameters() {
    const queryParams = this.route.snapshot.queryParams;
    return parseQueryParams<MeetingsFilter>(queryParams, defaultFilter);
  }
}
