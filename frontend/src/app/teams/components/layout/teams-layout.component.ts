import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError, Subject, takeUntil, tap } from 'rxjs';
import { TeamsService } from '../../services/teams.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-teams-layout',
  templateUrl: './teams-layout.component.html',
  styleUrls: ['./teams-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsLayoutComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  isLoading = true;
  isError = false; 
  errorMessage = ''; 
  team$ = this.teamsService.currentTeam$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private teamsService: TeamsService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        tap(() => (this.isLoading = true)),
        catchError((err) => {
          this.handleError(err);
          return throwError(() => err);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((params) => {
        const teamIdParam = params.get('teamId');
        if (!teamIdParam) {
          this.handleError('Invalid team ID');
          return;
        }

        const teamIdNumber = Number(teamIdParam);
        if (isNaN(teamIdNumber)) {
          this.handleError('Invalid team ID');
          return;
        }

        this.teamsService
          .getTeamById(teamIdNumber)
          .pipe(
            tap(() => (this.isLoading = false)),
            catchError((err) => {
              this.handleError(err);
              return throwError(() => err);
            }),
            takeUntil(this.unsubscribe$)
          )
          .subscribe((team) => {
            this.teamsService.assignCurrentTeam(team);
            this.cd.markForCheck();
          });
      });
  }

  handleError(error: any) {
    this.isLoading = false;
    this.isError = true;
    this.errorMessage = error.message || 'An error occurred';
    this.toastService.open('Failed to get team');
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
