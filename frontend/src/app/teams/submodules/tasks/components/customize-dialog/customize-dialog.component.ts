import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface CustomizeDialogComponentProps {}

@Component({
  selector: 'app-customize-dialog',
  templateUrl: './customize-dialog.component.html',
  styleUrls: ['./customize-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomizeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomizeDialogComponentProps
  ) {}

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('Heelo World');
  }

  movies = [
    { label: 'Episode I - The Phantom Menace', hexCode: '#36A41D' },
    { label: 'Episode II - Attack of the Clones', hexCode: '#EE3939' },
    { label: 'Episode III - Revenge of the Sith', hexCode: '#E76500' },
    { label: 'Episode IV - A New Hope', hexCode: '#36A41D' },
    { label: 'Episode V - The Empire Strikes Back', hexCode: '#049F9A' },
    { label: 'Episode VI - Return of the Jedi', hexCode: '#1B90FF' },
    { label: 'Episode VII - The Force Awakens ', hexCode: '#7858FF' },
    { label: 'Episode VIII - The Last Jedi', hexCode: '#F31DED' },
    { label: 'Episode IX - The Rise of Skywalker', hexCode: '#FA4F96' },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  onAddStatusClick(event: Event) {
    this.movies.push({ label: 'Status', hexCode: '#5B738B' });
  }
}
