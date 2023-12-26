import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/tasks.model';
import {
  CustomizeStatusDTO,
  SaveTaskStatusDTO,
} from '../models/customize-task.dto';
import { CreateTaskDTO } from '../models/create-task.dto';
import { UpdateTaskDTO } from '../models/update-task.dto';
import { CreateTaskNotesDTO, TaskNotesDTO } from '../models/task-notes.dto';
import { TasksFilterDTO } from '../models/tasks-filter.dto';
import { createQueryParams } from 'src/app/shared/utils/request-params.util';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private readonly baseUrl: string = '/api/v1/tasks';

  constructor(private httpClient: HttpClient) {}

  getTaskById(taskId: number) {
    return this.httpClient.get<Task>(`${this.baseUrl}/${taskId}`);
  }

  deleteTaskById(taskId: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${taskId}`);
  }

  getStatusesWithTasks(teamId: number, filter: TasksFilterDTO) {
    let params = createQueryParams(filter);
    params = params.set('teamId', teamId);
    params = params.set('includeTasks', true);

    return this.httpClient.get<TaskStatus[]>(`${this.baseUrl}/statuses`, {
      params: params,
    });
  }

  getStatusesWithoutTasks(teamId: number) {
    return this.httpClient.get<TaskStatus[]>(`${this.baseUrl}/statuses`, {
      params: { teamId: teamId, includeTasks: false },
    });
  }

  deleteStatus(teamId: number, statusId: number) {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/statuses/${statusId}`,
      {
        params: { teamId: teamId },
      }
    );
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

  createTask(teamId: number, dto: CreateTaskDTO) {
    return this.httpClient.post<void>(`${this.baseUrl}`, dto, {
      params: { teamId: teamId },
    });
  }

  updateTask(taskId: number, dto: UpdateTaskDTO) {
    return this.httpClient.put<void>(`${this.baseUrl}/${taskId}`, dto);
  }

  getTaskNotes(taskId: number) {
    return this.httpClient.get<TaskNotesDTO[]>(
      `${this.baseUrl}/${taskId}/notes`
    );
  }

  createTaskNote(taskId: number, teamId: number, dto: CreateTaskNotesDTO) {
    return this.httpClient.post<void>(`${this.baseUrl}/${taskId}/notes`, dto, {
      params: { teamId },
    });
  }

  deleteTaskNote(noteId: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/notes/${noteId}`);
  }
}
