import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, catchError, throwError, Subject, takeUntil } from 'rxjs';
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

  team$ = this.teamsService.currentTeam$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private teamsService: TeamsService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        const teamIdParam = params.get('teamId');
        if (!teamIdParam) return;

        const teamIdNumber = Number(teamIdParam);
        if (isNaN(teamIdNumber)) return;

        this.teamsService
          .getTeamById(teamIdNumber)
          .pipe(
            catchError((err) => {
              this.toastService.open('Failed to get team');
              return throwError(() => err);
            }),
            take(1)
          )
          .subscribe((team) => {
            this.teamsService.assignCurrentTeam(team);
          });

        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
