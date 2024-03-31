import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { EMPTY, Subject, catchError, switchMap, takeUntil, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamFilesService } from '../../services/team-files.service'
import { UploadFileDialogComponent } from '../dialogs/upload-file-dialog/upload-file-dialog.component'

@Component({
	selector: 'app-files-toolbar',
	templateUrl: './files-toolbar.component.html',
	styleUrls: ['./files-toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesToolbarComponent implements OnDestroy {
	unsubscribe$: Subject<void> = new Subject()

	constructor(
		private dialog: MatDialog,
		private teamFilesService: TeamFilesService,
		private toastrService: ToastService,
	) {}

	ngOnDestroy() {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	onUploadButtonClick() {
		const dialogRef = this.dialog.open(UploadFileDialogComponent, {
			minWidth: '30%',
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(form => {
					if (form) {
						return this.teamFilesService.uploadTeamFile(form)
					}

					return EMPTY
				}),
				catchError(err => {
					this.toastrService.error('Failed to upload a team file')
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$),
			)
			.subscribe(() => {
				this.toastrService.open('Successfully uploaded team file')
				this.teamFilesService.triggerRefreshTeamFiles()
			})
	}
}
