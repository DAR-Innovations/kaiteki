import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskPriority } from '../../models/tasks.model';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

export interface CreateTaskDialogComponentProps {}

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent {
  form: FormGroup;
  selectedTags: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTaskDialogComponentProps
  ) {
    this.form = this.createForm();
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedTags.push(value);
    }
    event.chipInput.clear();
  }

  remove(fruit: string): void {
    const index = this.selectedTags.indexOf(fruit);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  edit(fruit: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(fruit);
      return;
    }

    const index = this.selectedTags.indexOf(fruit);
    if (index >= 0) {
      this.selectedTags[index] = value;
    }
  }

  onSubmit() {
    console.log(this.form.getRawValue());
    this.dialogRef.close(this.form.getRawValue());
  }

  private createForm() {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      priority: new FormControl(TaskPriority.MEDIUM, [Validators.required]),
      executor: new FormControl(null, []),
      tags: new FormControl([], []),
      startDeadline: new FormControl(new Date(), [Validators.required]),
      endDeadline: new FormControl(null, []),
    });
  }
}
