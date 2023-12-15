import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateTeamDTO } from 'src/app/teams/models/teams.model';

@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTeamDialogComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CreateTeamDialogComponent, CreateTeamDTO>
  ) {}

  onBackClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const values = this.form.getRawValue();

    const dto: CreateTeamDTO = {
      name: values.name!,
      description: values.description!,
    };

    this.dialogRef.close(dto);
  }
}
