import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { TaskViewComponent } from './pages/task-view/task-view.component'
import { TasksListComponent } from './pages/tasks-list/tasks-list.component'

const routes: Routes = [
	{
		path: '',
		component: TasksListComponent,
	},
	{
		path: ':taskId',
		component: TaskViewComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TasksRoutingModule {}
