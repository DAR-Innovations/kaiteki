import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import {
  createQueryParamsOnFilter,
  parseQueryParams,
} from 'src/app/shared/utils/request-params.util';
import { TeamMembersFilterDTO } from 'src/app/teams/models/team-members-filter.dto';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFilterComponent {
  @Output() onFilter = new EventEmitter<TeamMembersFilterDTO>();
  private destroy$ = new Subject<void>();

  views: string[] = ['Table', 'Cards'];

  form = new FormGroup({
    searchValue: new FormControl(''),
    view: new FormControl(),
  });

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.patchInitialFormValues();
    this.trackFormValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchInitialFormValues() {
    const initialFilter: TeamMembersFilterDTO = this.getQueryParameters();
    console.log(initialFilter);

    this.form.patchValue(initialFilter);
    this.onFilter.emit(initialFilter);
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((form) => {
        const filter: TeamMembersFilterDTO = {
          searchValue: form.searchValue ?? undefined,
          view: form.view ?? undefined,
        };

        this.saveQueryParamters(filter);
        this.onFilter.emit(filter);
      });
  }

  private saveQueryParamters(filter: TeamMembersFilterDTO) {
    this.router.navigate([], {
      queryParams: createQueryParamsOnFilter(filter),
    });
  }

  private getQueryParameters() {
    const defaultFilter: Partial<TeamMembersFilterDTO> = {
      searchValue: '',
      view: this.views[0],
    };

    const queryParams = this.route.snapshot.queryParams;
    return parseQueryParams<TeamMembersFilterDTO>(queryParams, defaultFilter);
  }
}
