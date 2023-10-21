import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TasksCustomizeComponent } from './pages/tasks-customize/tasks-customize.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
  },
  {
    path: 'customize',
    component: TasksCustomizeComponent,
  },
  {
    path: ':id/edit',
    component: TaskEditComponent,
  },
  {
    path: ':id',
    component: TaskViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
