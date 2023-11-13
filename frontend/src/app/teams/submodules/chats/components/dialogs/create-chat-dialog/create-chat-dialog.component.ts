import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-chat-dialog',
  templateUrl: './create-chat-dialog.component.html',
  styleUrls: ['./create-chat-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChatDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    members: new FormControl([], [Validators.required]),
  });

  members = [
    { id: 1, name: 'Diar Begisbayev' },
    { id: 2, name: 'Ramazan Seiitbek' },
    { id: 3, name: 'Aliya Tazhigaliyeva' },
  ];

  constructor(private dialogRef: MatDialogRef<CreateChatDialogComponent>) {}

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
