import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, take, catchError, throwError, map } from 'rxjs';
import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { CreateTeamDialogComponent } from 'src/app/teams/components/dialogs/create-team-dialog/create-team-dialog.component';
import { CreateTeamDTO, Teams } from 'src/app/teams/models/teams.model';
import { TeamsService } from 'src/app/teams/services/teams.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  collapsed$ = this.sidebarService.sidebarCollapsedState;
  sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(
    ([_, value]) => value
  );
  teams$ = this.teamsService.teams$;
  integrations = [{ name: 'Spotify', link: 'spotify' }];

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private teamsService: TeamsService,
    private toastService: ToastrService,
    private sidebarService: SidebarService
  ) {}

  onCreateTeam() {
    const dialogRef = this.dialog.open<any, any, CreateTeamDTO>(
      CreateTeamDialogComponent,
      {
        minWidth: '30%',
      }
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter((form) => !!form),
        switchMap((form) => this.teamsService.createTeam(form!)),
        catchError((err) => {
          this.toastService.open('Failed to create team');
          return throwError(() => err);
        }),
        take(1)
      )
      .subscribe(() => {
        this.toastService.open('Successfully created team');
        this.teams$ = this.teamsService.getTeams();
        this.cd.markForCheck();
      });
  }

  teamsTrackBy(index: number, team: Teams) {
    return team.id;
  }
}
