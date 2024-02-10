import { PaginatedResponse } from './../../../../shared/models/pagination.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePostDTO, PostsFilter, UpdatePostDTO } from '../models/post.dto';
import { Posts } from '../models/posts.model';
import { createQueryParams } from 'src/app/shared/utils/request-params.util';
import { PageableRequest } from 'src/app/shared/models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private readonly baseUrl: string = '/api/v1/posts';

  constructor(private httpClient: HttpClient) {}

  getPosts(teamId: number, filter: PostsFilter, pageable: PageableRequest) {
    const params = {
      ...filter,
      ...pageable,
    };

    return this.httpClient.get<PaginatedResponse<Posts[]>>(
      `${this.baseUrl}?teamId=${teamId}`,
      {
        params: createQueryParams(params),
      }
    );
  }

  getLikedPosts(pageable: PageableRequest) {
    return this.httpClient.get<PaginatedResponse<Posts[]>>(
      `${this.baseUrl}/liked`,
      {
        params: createQueryParams(pageable),
      }
    );
  }

  getPost(postId: number) {
    return this.httpClient.get<Posts>(`${this.baseUrl}/${postId}`);
  }

  toggleLikePost(postId: number) {
    return this.httpClient.post<void>(`${this.baseUrl}/${postId}/like`, {});
  }

  createPost(teamId: number, dto: CreatePostDTO) {
    const formData = new FormData();

    if (dto.image) {
      formData.append('image', dto.image);
    }

    formData.append('title', dto.title);
    formData.append('description', dto.description);
    formData.append('content', dto.content);

    return this.httpClient.post<void>(
      `${this.baseUrl}?teamId=${teamId}`,
      formData
    );
  }

  deletePost(postId: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${postId}`);
  }

  updatePost(postId: number, dto: UpdatePostDTO) {
    const formData = new FormData();

    if (dto.image) {
      formData.append('image', dto.image);
    }

    formData.append('title', dto.title);
    formData.append('description', dto.description);
    formData.append('content', dto.content);

    return this.httpClient.put<void>(`${this.baseUrl}/${postId}`, formData);
  }
}
