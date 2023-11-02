import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface StatusesCustomizeDialogComponentProps {}

@Component({
  selector: 'app-statuses-customize-dialog',
  templateUrl: './statuses-customize-dialog.component.html',
  styleUrls: ['./statuses-customize-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusesCustomizeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StatusesCustomizeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StatusesCustomizeDialogComponentProps
  ) {}

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Heelo World');
  }

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
