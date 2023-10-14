import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from '../../models/tasks.model';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCreateComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    priority: new FormControl(TaskPriority.MEDIUM, [Validators.required]),
    executor: new FormControl(null, []),
    tags: new FormControl([], []),
    startDeadline: new FormControl(new Date(), [Validators.required]),
    endDeadline: new FormControl(null, []),
  });

  selectedTags: string[] = [];

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
    console.log(this.form.value);
  }
}
