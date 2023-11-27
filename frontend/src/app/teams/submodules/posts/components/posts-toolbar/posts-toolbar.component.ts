import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostDialogComponent } from '../dialogs/create-post-dialog/create-post-dialog.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-posts-toolbar',
  templateUrl: './posts-toolbar.component.html',
  styleUrls: ['./posts-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsToolbarComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject();

  constructor(private dialog: MatDialog) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onWriteClick(event: Event) {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      minWidth: '60%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((form) => {
        console.log(form);
      });
  }
}
