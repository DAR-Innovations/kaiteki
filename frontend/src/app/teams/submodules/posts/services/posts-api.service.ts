import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { PageableRequest } from 'src/app/shared/models/pagination.model'
import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { CreatePostDTO, PostsFilter, UpdatePostDTO } from '../models/post.dto'
import { Posts } from '../models/posts.model'

import { PaginatedResponse } from './../../../../shared/models/pagination.model'

@Injectable({
	providedIn: 'root',
})
export class PostsApiService {
	private readonly baseUrl: string = '/api/v1/posts'

	constructor(private httpClient: HttpClient) {}

	getPosts(teamId: number, filter: PostsFilter, pageable: PageableRequest) {
		const params = {
			...filter,
			...pageable,
			teamId,
		}

		return this.httpClient.get<PaginatedResponse<Posts[]>>(`${this.baseUrl}`, {
			params: createQueryParams(params),
		})
	}

	getLikedPosts(teamId: number, pageable: PageableRequest) {
		const params = {
			...pageable,
			teamId,
		}

		return this.httpClient.get<PaginatedResponse<Posts[]>>(`${this.baseUrl}/liked`, {
			params: createQueryParams(params),
		})
	}

	getPost(teamId: number, postId: number) {
		return this.httpClient.get<Posts>(`${this.baseUrl}/${postId}`, {
			params: createQueryParams({ teamId }),
		})
	}

	toggleLikePost(teamId: number, postId: number) {
		return this.httpClient.post<void>(
			`${this.baseUrl}/${postId}/liked`,
			{},
			{
				params: createQueryParams({ teamId }),
			},
		)
	}

	createPost(teamId: number, dto: CreatePostDTO) {
		const formData = new FormData()

		if (dto.image) {
			formData.append('image', dto.image)
		}

		formData.append('title', dto.title)
		formData.append('description', dto.description)
		formData.append('content', dto.content)

		return this.httpClient.post<void>(`${this.baseUrl}?teamId=${teamId}`, formData)
	}

	deletePost(postId: number) {
		return this.httpClient.delete<void>(`${this.baseUrl}/${postId}`)
	}

	updatePost(postId: number, dto: UpdatePostDTO) {
		const formData = new FormData()

		if (dto.image) {
			formData.append('image', dto.image)
		}

		formData.append('title', dto.title)
		formData.append('description', dto.description)
		formData.append('content', dto.content)

		return this.httpClient.put<void>(`${this.baseUrl}/${postId}`, formData)
	}
}
