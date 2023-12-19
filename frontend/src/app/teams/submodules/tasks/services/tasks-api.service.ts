import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskStatus } from '../models/tasks.model';

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
}
