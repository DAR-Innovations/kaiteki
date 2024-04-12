import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'

import { Subject, startWith, switchMap } from 'rxjs'

import { TasksFilterDTO } from '../../models/tasks-filter.dto'
import { TasksService } from '../../services/tasks.service'

@Component({
	selector: 'app-tasks-list-page',
	templateUrl: './tasks-list.component.html',
	styleUrls: ['./tasks-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit, OnDestroy {
	public skeletonArray = new Array(5).fill(0)

	private destroy$ = new Subject<void>()
	filter: TasksFilterDTO = {}
	columns$ = this.tasksService.refetchTasks$.pipe(
		startWith([]),
		switchMap(() => this.loadStatusesWithTasks()),
	)

	constructor(private tasksService: TasksService) {}

	ngOnInit() {
		this.tasksService.refetchTasks()
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
	}

	private loadStatusesWithTasks() {
		return this.tasksService.getStatusesWithTasks(this.filter)
	}

	onFilter(filter: TasksFilterDTO) {
		this.filter = filter
		this.tasksService.refetchTasks()
	}
}
