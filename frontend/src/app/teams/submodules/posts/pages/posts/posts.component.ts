import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { Observable, catchError, map, startWith, switchMap, tap, throwError } from 'rxjs'

import { InitialPaginationValue } from 'src/app/shared/components/paginator/paginator.component'
import { PageableDTO, PageableRequest } from 'src/app/shared/models/pagination.model'
import { ToastService } from 'src/app/shared/services/toast.service'

import { PostsFilter } from '../../models/post.dto'
import { Posts } from '../../models/posts.model'
import { PostsService } from '../../services/posts.service'

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
	public skeletonArray = new Array(3).fill(0)
	filter: PostsFilter = {}
	pagination: PageableDTO = InitialPaginationValue

	posts$ = this.postsService.refreshPosts$.pipe(
		startWith([]),
		switchMap(() => this.loadPosts()),
	)

	likedPosts$: Observable<Posts[]> = this.postsService.refreshPosts$.pipe(
		startWith([]),
		switchMap(() => this.loadLikedPosts()),
	)

	constructor(
		private postsService: PostsService,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.postsService.triggerRefreshPosts()
	}

	private loadPosts() {
		const pageable: PageableRequest = {
			size: this.pagination.size,
			page: this.pagination.page,
		}

		return this.postsService.getPosts(this.filter, pageable).pipe(
			tap(res => {
				this.pagination.page = res.number
				this.pagination.size = res.size
				this.pagination.totalElements = res.totalElements
				this.pagination.totalPages = res.totalPages
			}),
			map(res => res.content),
			catchError(err => {
				this.toastService.open('Failed to get posts')
				return throwError(() => err)
			}),
		)
	}

	private loadLikedPosts() {
		const pageable: PageableRequest = {
			size: 25,
			page: 0,
		}

		return this.postsService.getLikedPosts(pageable).pipe(
			map(res => res.content),
			catchError(err => {
				this.toastService.open('Failed to get favourite posts')
				return throwError(() => err)
			}),
		)
	}

	onPage(page: PageableRequest) {
		this.pagination.size = page.size
		this.pagination.page = page.page
		this.postsService.triggerRefreshPosts()
	}

	onFilter(filter: PostsFilter) {
		this.filter = filter
		this.postsService.triggerRefreshPosts()
	}
}
