import { Injectable } from '@angular/core'

import { Subject, catchError, switchMap, throwError } from 'rxjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { CreateTaskDTO } from '../models/create-task.dto'
import { SaveTaskStatusDTO } from '../models/customize-task.dto'
import { CreateTaskNotesDTO } from '../models/task-notes.dto'
import { TasksExportDTO, TasksFilterDTO } from '../models/tasks-filter.dto'
import { UpdateTaskDTO } from '../models/update-task.dto'

import { TasksApiService } from './tasks-api.service'

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	private refetchTasksSubject = new Subject<void>()
	refetchTasks$ = this.refetchTasksSubject.asObservable()

	constructor(
		private teamsService: TeamsService,
		private tasksApiService: TasksApiService,
	) {}

	public deleteTaskById(taskId: number) {
		return this.tasksApiService.deleteTaskById(taskId)
	}

	public getStatusesWithTasks(filter: TasksFilterDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.getStatusesWithTasks(team.id, filter)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	public getStatusesWithoutTasks() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.getStatusesWithoutTasks(team.id)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	public getCustomizeStatuses() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.getCustomizeStatuses(team.id)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	public saveCustomizeStatuses(dto: SaveTaskStatusDTO[]) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.saveCustomizeStatuses(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
			catchError(err => {
				return throwError(() => err)
			}),
		)
	}

	public createTask(dto: CreateTaskDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.createTask(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
			catchError(err => {
				return throwError(() => err)
			}),
		)
	}

	public getTaskById(taskId: number) {
		return this.tasksApiService.getTaskById(taskId)
	}

	public updateTask(taskId: number, dto: UpdateTaskDTO) {
		return this.tasksApiService.updateTask(taskId, dto)
	}

	public deleteStatus(statusId: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.deleteStatus(team.id, statusId)
				}

				return throwError(() => Error('No current team'))
			}),
			catchError(err => {
				return throwError(() => err)
			}),
		)
	}

	public getTaskNotes(taskId: number) {
		return this.tasksApiService.getTaskNotes(taskId)
	}

	public deleteTaskNote(noteId: number) {
		return this.tasksApiService.deleteTaskNote(noteId)
	}

	public createTaskNote(taskId: number, dto: CreateTaskNotesDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.createTaskNote(taskId, team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
			catchError(err => {
				return throwError(() => err)
			}),
		)
	}

	exportTasks(dto: TasksExportDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.tasksApiService.exportTasks(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
			catchError(err => {
				return throwError(() => err)
			}),
		)
	}

	public refetchTasks() {
		this.refetchTasksSubject.next()
	}
}
