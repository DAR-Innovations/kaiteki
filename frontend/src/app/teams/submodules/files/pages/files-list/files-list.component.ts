import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Subject,
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { TeamFilesFilter } from '../../models/team-files.dto';
import { TeamFilesService } from '../../services/team-files.service';
import {
  PageableDTO,
  PageableRequest,
} from 'src/app/shared/models/pagination.model';
import { InitialPaginationValue } from 'src/app/shared/components/paginator/paginator.component';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  filter: TeamFilesFilter = {};
  pagination: PageableDTO = InitialPaginationValue;
  teamFilesRefreshTrigger$ = this.teamFilesService.refreshTeamFiles$;

  files$ = this.loadTeamFiles();

  constructor(
    private teamFilesService: TeamFilesService,
    private toastrService: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.trackRefreshTeamFiles();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private trackRefreshTeamFiles() {
    this.teamFilesRefreshTrigger$
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.files$ = this.loadTeamFiles();
        this.cd.markForCheck();
      });
  }

  private loadTeamFiles() {
    const pageable: PageableRequest = {
      size: this.pagination.size,
      page: this.pagination.page,
    };

    return this.teamFilesService.getTeamFiles(pageable, this.filter).pipe(
      tap((res) => {
        this.pagination.page = res.number;
        this.pagination.size = res.size;
        this.pagination.totalElements = res.totalElements;
        this.pagination.totalPages = res.totalPages;
      }),
      map((res) => res.content),
      catchError((err) => {
        this.toastrService.open('Failed to get team files');
        return throwError(() => err);
      })
    );
  }

  onFilter(filter: TeamFilesFilter) {
    this.filter = filter;
    this.files$ = this.loadTeamFiles();
    this.cd.markForCheck();
  }

  onPage(page: PageableRequest) {
    this.pagination.size = page.size;
    this.pagination.page = page.page;
    this.files$ = this.loadTeamFiles();
    this.cd.markForCheck();
  }
}
