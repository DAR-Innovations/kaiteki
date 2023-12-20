import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaveTaskStatusDTO } from '../../../models/customize-task.dto';
import { TaskStatusType } from '../../../models/tasks.model';
import { TasksService } from '../../../services/tasks.service';
import { take } from 'rxjs';

export interface CustomizeDialogComponentProps {}

@Component({
  selector: 'app-customize-dialog',
  templateUrl: './customize-dialog.component.html',
  styleUrls: ['./customize-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeDialogComponent implements OnInit {
  openStatus: SaveTaskStatusDTO | null = null;
  doneStatus: SaveTaskStatusDTO | null = null;
  statuses: SaveTaskStatusDTO[] = [];

  constructor(
    public dialogRef: MatDialogRef<CustomizeDialogComponent>,
    private cd: ChangeDetectorRef,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: CustomizeDialogComponentProps
  ) {}

  ngOnInit(): void {
    this.tasksService
      .getCustomizeStatuses()
      .pipe(take(1))
      .subscribe((customizeStatusDto) => {
        this.openStatus = customizeStatusDto.openStatus;
        this.doneStatus = customizeStatusDto.doneStatus;
        this.statuses = customizeStatusDto.regularStatuses;
        this.cd.markForCheck();
      });
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const orderedStatuses = this.statuses.map((status, index) => {
      status.order = index + 2;
      return status;
    });

    const doneStatus = {
      ...this.doneStatus,
      order: orderedStatuses.length + 2,
    };

    console.log([this.openStatus, ...orderedStatuses, doneStatus]);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.statuses, event.previousIndex, event.currentIndex);
  }

  onDeleteStatus(status: SaveTaskStatusDTO) {
    let index: number | null = null;

    if (status.id) {
      index = this.statuses.findIndex((s) => s.id === status.id);
    } else {
      index = this.statuses.findIndex(
        (s) => s.name === status.name && s.color === status.color
      );
    }

    if (index !== null) {
      this.statuses.splice(index, 1);
    }
  }

  onChangeStatus(status: SaveTaskStatusDTO) {
    const foundStatus = this.findStatus(status);
    console.log(foundStatus);
    if (foundStatus) {
      foundStatus.color = status.color;
      foundStatus.name = status.name;
    }
  }

  findStatus(status: SaveTaskStatusDTO) {
    return this.statuses.find(
      (s) =>
        (status.id && s.id === status.id) ||
        (s.name === status.name && s.color === status.color)
    );
  }

  onAddStatusClick(event: Event) {
    this.statuses.push({
      name: 'In Progress',
      color: '#5B738B',
      type: TaskStatusType.REGULAR,
    });
  }

  get invalid() {
    return !this.openStatus || !this.doneStatus;
  }
}
