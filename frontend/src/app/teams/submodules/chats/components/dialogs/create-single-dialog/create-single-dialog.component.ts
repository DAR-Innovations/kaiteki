import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-single-dialog',
  templateUrl: './create-single-dialog.component.html',
  styleUrls: ['./create-single-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSingleDialogComponent {
  form = new FormGroup({
    member: new FormControl([], [Validators.required]),
  });

  members = [
    { id: 1, name: 'Diar Begisbayev' },
    { id: 2, name: 'Ramazan Seiitbek' },
    { id: 3, name: 'Aliya Tazhigaliyeva' },
  ];

  constructor(private dialogRef: MatDialogRef<CreateSingleDialogComponent>) {}

  memberTrackBy(index: number, member: any) {
    return member.id;
  }

  onBackClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
