import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Subject,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  Observable,
} from 'rxjs';
import { TasksFilterDTO } from '../../models/tasks-filter.dto';
import { ActivatedRoute, Router } from '@angular/router';
import {
  createQueryParamsOnFilter,
  parseQueryParams,
} from 'src/app/shared/utils/request-params.util';
import { TeamMembersDTO } from 'src/app/teams/models/team-members.model';
import { TeamsService } from 'src/app/teams/services/teams.service';

@Component({
  selector: 'app-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFilterComponent implements OnInit, OnDestroy {
  @Output() onFilter = new EventEmitter<TasksFilterDTO>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  executors$: Observable<TeamMembersDTO[]> =
    this.teamsSevice.getAllTeamMembers();
  currentTeamMember$: Observable<TeamMembersDTO | null> =
    this.teamsSevice.currentTeamMember$;
  views: string[] = ['List', 'Kanban', 'Table'];

  form = new FormGroup({
    executorId: new FormControl(),
    view: new FormControl(),
    searchValue: new FormControl(),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamsSevice: TeamsService,
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
    const initialFilter: TasksFilterDTO = this.getQueryParameters();

    this.form.patchValue({
      executorId: initialFilter.executorId,
      view: initialFilter.view,
      searchValue: initialFilter.searchValue,
    });

    this.onFilter.emit(initialFilter);
    this.cd.detectChanges();
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(800), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((form) => {
        const filter: TasksFilterDTO = {
          searchValue: form.searchValue ?? undefined,
          view: form.view ?? undefined,
          executorId: form.executorId ?? undefined,
        };

        this.saveQueryParamters(filter);
        this.onFilter.emit(filter);
      });
  }

  private saveQueryParamters(filter: TasksFilterDTO) {
    this.router.navigate([], {
      queryParams: createQueryParamsOnFilter(filter),
    });
  }

  private getQueryParameters() {
    const defaultFilter: Partial<TasksFilterDTO> = {
      executorId: undefined,
      searchValue: '',
      view: this.views[1],
    };

    const queryParams = this.route.snapshot.queryParams;
    return parseQueryParams<TasksFilterDTO>(queryParams, defaultFilter);
  }
}
