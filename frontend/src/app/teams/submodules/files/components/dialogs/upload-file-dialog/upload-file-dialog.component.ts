import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileDialogComponent {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<UploadFileDialogComponent>) {
    this.form = this.createForm();
  }

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.getRawValue());
  }

  private createForm() {
    return new FormGroup({
      description: new FormControl('', [Validators.required]),
      files: new FormControl(
        [],
        [Validators.required, FileUploadValidators.filesLimit(1)]
      ),
    });
  }
}
