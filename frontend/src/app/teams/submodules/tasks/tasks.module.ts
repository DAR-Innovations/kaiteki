import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { KanbanColumnComponent } from './components/kanban-board/components/kanban-column/kanban-column.component';
import { KanbanItemComponent } from './components/kanban-board/components/kanban-item/kanban-item.component';
import { TasksToolbarComponent } from './components/tasks-toolbar/tasks-toolbar.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TasksCustomizeComponent } from './pages/tasks-customize/tasks-customize.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsSidebarComponent } from './components/task-details-sidebar/task-details-sidebar.component';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ListPanelComponent } from './components/list-view/components/list-panel/list-panel.component';

@NgModule({
  declarations: [
    TasksListComponent,
    KanbanBoardComponent,
    KanbanColumnComponent,
    KanbanItemComponent,
    TasksToolbarComponent,
    TasksCustomizeComponent,
    TaskEditComponent,
    TaskViewComponent,
    TaskDetailsSidebarComponent,
    CreateTaskDialogComponent,
    ListViewComponent,
    ListPanelComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    DragDropModule,
    ReactiveFormsModule,
  ],
})
export class TasksModule {}
