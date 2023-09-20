import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { KanbanColumn } from '../../models/tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  columns: KanbanColumn[] = [];
  connectedColumns: string[] = [];

  ngOnInit() {
    this.columns = [
      {
        id: 1,
        label: 'Todo',
        tasks: [
          { title: 'Go hom' },
          { title: 'Work' },
          { title: 'Go hom' },
          { title: 'Work' },
          { title: 'Go hom' },
          { title: 'Work' },
          { title: 'Go hom' },
          { title: 'Work' },
        ],
      },
      {
        id: 2,
        label: 'In Progess',
        tasks: [{ title: 'Watch Movie' }, { title: 'Make dinner' }],
      },
      {
        id: 3,
        label: 'Done',
        tasks: [{ title: 'Get sleep' }, { title: 'By glases' }],
      },
      {
        id: 4,
        label: 'Testing',
        tasks: [{ title: 'DADA sleep' }, { title: 'By 231231' }],
      },
    ];

    this.connectedColumns = this.columns.map((c) => c.id.toLocaleString());
  }
}
