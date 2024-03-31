import { Injectable } from '@angular/core'

import { Subject, switchMap, throwError } from 'rxjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { PageableRequest } from '../../../../shared/models/pagination.model'
import { CreatePostDTO, PostsFilter, UpdatePostDTO } from '../models/post.dto'

import { PostsApiService } from './posts-api.service'

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private refreshPostsSubject = new Subject<void>()
	refreshPosts$ = this.refreshPostsSubject.asObservable()

	constructor(
		private postsApiService: PostsApiService,
		private teamsService: TeamsService,
	) {}

	getPosts(filter: PostsFilter, pageable: PageableRequest) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.postsApiService.getPosts(team.id, filter, pageable)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getLikedPosts(pageable: PageableRequest) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.postsApiService.getLikedPosts(team.id, pageable)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	createPost(dto: CreatePostDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.postsApiService.createPost(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getPost(postId: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.postsApiService.getPost(team.id, postId)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	toggleLikePost(postId: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.postsApiService.toggleLikePost(team.id, postId)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	deletePost(postId: number) {
		return this.postsApiService.deletePost(postId)
	}

	updatePost(postId: number, dto: UpdatePostDTO) {
		return this.postsApiService.updatePost(postId, dto)
	}

	triggerRefreshPosts() {
		this.refreshPostsSubject.next()
	}
}
