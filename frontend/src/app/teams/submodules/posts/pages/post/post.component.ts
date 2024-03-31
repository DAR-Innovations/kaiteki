import { Clipboard } from '@angular/cdk/clipboard'
import { Location } from '@angular/common'
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
	SecurityContext,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'

import { EMPTY, catchError, filter, finalize, switchMap, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { UpdatePostDialogComponent } from '../../components/dialogs/update-post-dialog/update-post-dialog.component'
import { Posts } from '../../models/posts.model'
import { PostsService } from '../../services/posts.service'

import { TeamsService } from './../../../../services/teams.service'

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
	post: Posts | null = null
	loading = true

	currentTeamMember$ = this.teamsService.currentTeamMember$

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private postsService: PostsService,
		private toastService: ToastService,
		private cd: ChangeDetectorRef,
		private sanitizer: DomSanitizer,
		private clipboard: Clipboard,
		private teamsService: TeamsService,
		private dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.loadPostByUrl()
	}

	loadPostByUrl() {
		const id = this.route.snapshot.paramMap.get('postId')
		const numberedId = Number(id)

		if (isNaN(numberedId)) {
			this.toastService.error('The post id is invalid')
			return
		}

		this.postsService
			.getPost(numberedId)
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to load post')
					return throwError(() => err)
				}),
				finalize(() => {
					this.loading = false
					this.cd.markForCheck()
				}),
				take(1),
			)
			.subscribe(post => {
				this.post = post
			})
	}

	onLikeClick() {
		if (!this.post) return

		this.postsService
			.toggleLikePost(this.post.id)
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to toggle like post')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				if (!this.post) return

				this.post.liked = !this.post.liked
				this.cd.markForCheck()
			})
	}

	onShareClick() {
		const currentPath = window.location.href
		this.clipboard.copy(currentPath)
		this.toastService.open('Link saved to clipboard')
	}

	onDeleteClick() {
		if (!this.post) return

		this.postsService
			.deletePost(this.post.id)
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to delete post')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully deleted post')
				this.location.back()
			})
	}

	onEditClick(): void {
		if (!this.post) return

		const dialogRef = this.dialog.open(UpdatePostDialogComponent, {
			data: { post: this.post },
			minWidth: '90%',
			minHeight: '90%',
		})

		dialogRef
			.afterClosed()
			.pipe(
				filter(form => !!form),
				switchMap(form => {
					if (this.post) {
						return this.postsService.updatePost(this.post.id, form).pipe(
							catchError(err => {
								this.toastService.error('Failed to update post')
								return throwError(() => err)
							}),
						)
					}

					return EMPTY
				}),
				switchMap(() => {
					if (this.post) {
						return this.postsService.getPost(this.post.id).pipe(
							catchError(err => {
								this.toastService.error('Failed to load post')
								return throwError(() => err)
							}),
							finalize(() => {
								this.loading = false
								this.cd.markForCheck()
							}),
						)
					}

					return EMPTY
				}),
				take(1),
			)
			.subscribe(post => {
				if (post) {
					this.post = post
					this.toastService.open('Successfully updated post')
				}
			})
	}

	get safeHtmlContent() {
		if (this.post) {
			return this.sanitizer.sanitize(SecurityContext.HTML, this.post.content)
		}

		return ''
	}
}
