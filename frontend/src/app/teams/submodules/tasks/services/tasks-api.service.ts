import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskStatus } from '../models/tasks.model';
import {
  CustomizeStatusDTO,
  SaveTaskStatusDTO,
} from '../models/customize-task.dto';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private readonly baseUrl: string = '/api/v1/tasks';

  constructor(private httpClient: HttpClient) {}

  getStatusesWithTasks(teamId: number) {
    return this.httpClient.get<TaskStatus[]>(`${this.baseUrl}`, {
      params: { teamId: teamId },
    });
  }

  getCustomizeStatuses(teamId: number) {
    return this.httpClient.get<CustomizeStatusDTO>(
      `${this.baseUrl}/statuses/customize`,
      {
        params: { teamId: teamId },
      }
    );
  }

  saveCustomizeStatuses(teamId: number, dto: SaveTaskStatusDTO[]) {
    return this.httpClient.put<void>(
      `${this.baseUrl}/statuses/customize`,
      dto,
      {
        params: { teamId: teamId },
      }
    );
  }
}
