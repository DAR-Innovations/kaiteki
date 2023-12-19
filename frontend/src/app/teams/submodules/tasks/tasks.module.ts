import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanBoardComponent } from './components/views/kanban-board/kanban-board.component';
import { KanbanColumnComponent } from './components/views/kanban-board/components/kanban-column/kanban-column.component';
import { KanbanItemComponent } from './components/views/kanban-board/components/kanban-item/kanban-item.component';
import { TasksToolbarComponent } from './components/tasks-toolbar/tasks-toolbar.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { TaskDetailsSidebarComponent } from './components/task-details-sidebar/task-details-sidebar.component';
import { CreateTaskDialogComponent } from './components/dialogs/create-task-dialog/create-task-dialog.component';
import { ListViewComponent } from './components/views/list-view/list-view.component';
import { ListPanelComponent } from './components/views/list-view/components/list-panel/list-panel.component';
import { CustomizeDialogComponent } from './components/dialogs/customize-dialog/customize-dialog.component';
import { CustomizeStatusItemComponent } from './components/dialogs/customize-dialog/components/customize-status-item/customize-status-item.component';
import { TableViewComponent } from './components/views/table-view/table-view.component';
import { TasksFilterComponent } from './components/tasks-filter/tasks-filter.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    TasksListComponent,
    KanbanBoardComponent,
    KanbanColumnComponent,
    KanbanItemComponent,
    TasksToolbarComponent,
    TaskEditComponent,
    TaskViewComponent,
    TaskDetailsSidebarComponent,
    CreateTaskDialogComponent,
    ListViewComponent,
    ListPanelComponent,
    CustomizeDialogComponent,
    CustomizeStatusItemComponent,
    TableViewComponent,
    TasksFilterComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    DragDropModule,
    QuillModule.forRoot(),
  ],
})
export class TasksModule {}
