import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface CreateMeetingDialogComponentProps {}

@Component({
  selector: 'app-create-meeting-dialog',
  templateUrl: './create-meeting-dialog.component.html',
  styleUrls: ['./create-meeting-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMeetingDialogComponent {
  form: FormGroup;
  selectedTags: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateMeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateMeetingDialogComponentProps
  ) {
    this.form = this.createForm();
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.getRawValue());
  }

  private createForm() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = hours + ':' + minutes;

    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      particapants: new FormControl([], [Validators.required]),
      startDate: new FormControl(now, [Validators.required]),
      startTime: new FormControl(currentTime, []),
      endTime: new FormControl(null, []),
    });
  }
}
