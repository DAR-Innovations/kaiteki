import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostsFilter } from '../models/post.dto';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { Observable } from 'rxjs';
import { Posts } from '../models/posts.model';
import { createQueryParams } from 'src/app/shared/utils/request-params.util';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private readonly baseUrl: string = '/api/v1/posts';

  constructor(private httpClient: HttpClient) {}

  getChatRooms(
    teamId: number,
    filter: PostsFilter,
    pageable: Pagination
  ): Observable<Posts[]> {
    const params = {
      ...filter,
      ...pageable,
    };

    return this.httpClient.get<Posts[]>(`${this.baseUrl}?teamId=${teamId}`, {
      params: createQueryParams(params),
    });
  }
}
