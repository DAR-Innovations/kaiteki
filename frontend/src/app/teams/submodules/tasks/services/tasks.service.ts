import { TasksApiService } from './tasks-api.service';
import { Injectable } from '@angular/core';
import { switchMap, throwError } from 'rxjs';
import { TeamsService } from 'src/app/teams/services/teams.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private teamsService: TeamsService,
    private tasksApiService: TasksApiService
  ) {}

  public getStatusesWithTasks() {
    return this.teamsService.currentTeam$.pipe(
      switchMap((team) => {
        if (team) {
          return this.tasksApiService.getStatusesWithTasks(team.id);
        }

        return throwError(() => Error('No current team'));
      })
    );
  }
}
