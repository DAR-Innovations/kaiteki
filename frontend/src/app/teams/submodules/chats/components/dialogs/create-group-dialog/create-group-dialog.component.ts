import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGroupDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    members: new FormControl([], [Validators.required]),
  });

  members = [
    { id: 1, name: 'Diar Begisbayev' },
    { id: 2, name: 'Ramazan Seiitbek' },
    { id: 3, name: 'Aliya Tazhigaliyeva' },
  ];

  constructor(private dialogRef: MatDialogRef<CreateGroupDialogComponent>) {}

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
