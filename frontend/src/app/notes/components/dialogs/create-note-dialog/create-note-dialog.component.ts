import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateNoteDTO } from 'src/app/notes/models/create-note.dto';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteDialogComponent {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateNoteDialogComponent, CreateNoteDTO>
  ) {}

  onBackClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const values = this.form.getRawValue();

    const dto: CreateNoteDTO = {
      title: values.title!,
    };

    this.dialogRef.close(dto);
  }
}
