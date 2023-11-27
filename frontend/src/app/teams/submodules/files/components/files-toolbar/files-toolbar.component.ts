import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadFileDialogComponent } from '../dialogs/upload-file-dialog/upload-file-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-files-toolbar',
  templateUrl: './files-toolbar.component.html',
  styleUrls: ['./files-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesToolbarComponent implements OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

  constructor(private dialog: MatDialog) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onUploadButtonClick(event: Event) {
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      minWidth: '30%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((form) => {
        console.log(form);
      });
  }
}
