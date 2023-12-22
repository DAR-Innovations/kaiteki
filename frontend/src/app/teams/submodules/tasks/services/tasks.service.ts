import { TasksApiService } from './tasks-api.service';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, switchMap, take, throwError } from 'rxjs';
import { TeamsService } from 'src/app/teams/services/teams.service';
import { SaveTaskStatusDTO } from '../models/customize-task.dto';
import { TaskStatus } from '../models/tasks.model';
import { CreateTaskDTO } from '../models/create-task.dto';

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

  public getStatusesWithoutTasks() {
    return this.teamsService.currentTeam$.pipe(
      switchMap((team) => {
        if (team) {
          return this.tasksApiService.getStatusesWithoutTasks(team.id);
        }

        return throwError(() => Error('No current team'));
      })
    );
  }

  public getCustomizeStatuses() {
    return this.teamsService.currentTeam$.pipe(
      switchMap((team) => {
        if (team) {
          return this.tasksApiService.getCustomizeStatuses(team.id);
        }

        return throwError(() => Error('No current team'));
      })
    );
  }

  public saveCustomizeStatuses(dto: SaveTaskStatusDTO[]) {
    return this.teamsService.currentTeam$.pipe(
      switchMap((team) => {
        if (team) {
          return this.tasksApiService.saveCustomizeStatuses(team.id, dto);
        }

        return throwError(() => Error('No current team'));
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  public createTask(dto: CreateTaskDTO) {
    return this.teamsService.currentTeam$.pipe(
      switchMap((team) => {
        if (team) {
          return this.tasksApiService.createTask(team.id, dto);
        }

        return throwError(() => Error('No current team'));
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  public deleteStatus(statusId: number) {
    return this.teamsService.currentTeam$.pipe(
      switchMap((team) => {
        if (team) {
          return this.tasksApiService.deleteStatus(team.id, statusId);
        }

        return throwError(() => Error('No current team'));
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
