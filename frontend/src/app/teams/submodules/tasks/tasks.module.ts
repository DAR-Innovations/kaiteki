import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { KanbanColumnComponent } from './components/kanban-column/kanban-column.component';
import { KanbanItemComponent } from './components/kanban-item/kanban-item.component';
import { TasksFilterComponent } from './components/tasks-filter/tasks-filter.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TasksComponent } from './pages/tasks/tasks.component';

@NgModule({
  declarations: [
    TasksComponent,
    KanbanBoardComponent,
    KanbanColumnComponent,
    KanbanItemComponent,
    TasksFilterComponent,
  ],
  imports: [CommonModule, TasksRoutingModule, SharedModule, DragDropModule],
})
export class TasksModule {}
