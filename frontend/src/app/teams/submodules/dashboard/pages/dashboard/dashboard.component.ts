import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { catchError, map, take, tap, throwError } from 'rxjs';
import { initialPaginationValue } from 'src/app/shared/components/paginator/paginator.component';
import {
  Pagination,
  PaginationDTO,
} from 'src/app/shared/models/pagination.model';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { TeamMembersFilterDTO } from 'src/app/teams/models/team-members-filter.dto';
import { TeamsService } from 'src/app/teams/services/teams.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  filter: TeamMembersFilterDTO = {};
  pagination: PaginationDTO = initialPaginationValue

  teamMembers$ = this.loadTeamMembers();

  constructor(
    private teamsService: TeamsService,
    private toastrService: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  loadTeamMembers() {
    const pagination: Pagination = {
      size: this.pagination.size,
      page: this.pagination.page,
    };

    return this.teamsService.getTeamMembers(pagination, this.filter).pipe(
      tap((res) => {
        this.pagination.page = res.number;
        this.pagination.size = res.size;
        this.pagination.totalElements = res.totalElements;
        this.pagination.totalPages = res.totalPages;
      }),
      map((res) => res.content),
      catchError((err) => {
        this.toastrService.open('Failed to get team members');
        return throwError(() => err);
      })
    );
  }

  onFilter(filter: any) {
    this.filter = filter;
    this.teamMembers$ = this.loadTeamMembers();
    this.cd.markForCheck();
  }

  onPage(page: Pagination) {
    this.pagination.size = page.size;
    this.pagination.page = page.page;
    this.teamMembers$ = this.loadTeamMembers();
    this.cd.markForCheck();
  }

  onDeleteMember(id: number) {
    this.teamsService
      .deleteTeamMember(id)
      .pipe(
        catchError((err) => {
          this.toastrService.open('Failed to delete team member');
          return throwError(() => err);
        }),
        take(1)
      )
      .subscribe(() => {
        this.toastrService.open('Successfully removed team member');
        this.teamMembers$ = this.loadTeamMembers();
        this.cd.markForCheck();
      });
  }
}
