import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import {
	EMPTY,
	Subject,
	catchError,
	switchMap,
	takeUntil,
	throwError,
} from 'rxjs'

import { ToastrService } from 'src/app/shared/services/toastr.service'

import { PostsService } from '../../services/posts.service'
import { CreatePostDialogComponent } from '../dialogs/create-post-dialog/create-post-dialog.component'

@Component({
	selector: 'app-posts-toolbar',
	templateUrl: './posts-toolbar.component.html',
	styleUrls: ['./posts-toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsToolbarComponent implements OnDestroy {
	private destroy$: Subject<void> = new Subject()

	constructor(
		private dialog: MatDialog,
		private postsService: PostsService,
		private toastrService: ToastrService
	) {}

	ngOnDestroy() {
		this.destroy$.next()
		this.destroy$.complete()
	}

	onWriteClick(event: Event) {
		const dialogRef = this.dialog.open(CreatePostDialogComponent, {
			minWidth: '70%',
			minHeight: '80%',
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(form => {
					if (form) {
						return this.postsService.createPost(form)
					}

					return EMPTY
				}),
				catchError(err => {
					this.toastrService.error('Failed to create a post')
					return throwError(() => err)
				}),
				takeUntil(this.destroy$)
			)
			.subscribe(form => {
				this.toastrService.open('Successfully created a post')
				this.postsService.triggerRefreshPosts()
			})
	}
}
