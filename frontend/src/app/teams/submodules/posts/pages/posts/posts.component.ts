import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Posts } from '../../models/posts.model';
import {
  Observable,
  map,
  tap,
  catchError,
  throwError,
  startWith,
  switchMap,
} from 'rxjs';
import { PostsFilter } from '../../models/post.dto';
import {
  PageableDTO,
  PageableRequest,
} from 'src/app/shared/models/pagination.model';
import { InitialPaginationValue } from 'src/app/shared/components/paginator/paginator.component';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  filter: PostsFilter = {};
  pagination: PageableDTO = InitialPaginationValue;

  posts$ = this.postsService.refreshPosts$.pipe(
    startWith([]),
    switchMap(() => this.loadPosts())
  );

  likedPosts$: Observable<Posts[]> = this.postsService.refreshPosts$.pipe(
    startWith([]),
    switchMap(() => this.loadLikedPosts())
  );

  constructor(
    private postsService: PostsService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.postsService.triggerRefreshPosts();
  }

  private loadPosts() {
    const pageable: PageableRequest = {
      size: this.pagination.size,
      page: this.pagination.page,
    };

    return this.postsService.getPosts(this.filter, pageable).pipe(
      tap((res) => {
        this.pagination.page = res.number;
        this.pagination.size = res.size;
        this.pagination.totalElements = res.totalElements;
        this.pagination.totalPages = res.totalPages;
      }),
      map((res) => res.content),
      catchError((err) => {
        this.toastrService.open('Failed to get posts');
        return throwError(() => err);
      })
    );
  }

  private loadLikedPosts() {
    // fetch all liked posts or make owen pagination
    const pageable: PageableRequest = {
      size: 25,
      page: 0,
    };

    return this.postsService.getLikedPosts(pageable).pipe(
      map((res) => res.content),
      catchError((err) => {
        this.toastrService.open('Failed to get favourite posts');
        return throwError(() => err);
      })
    );
  }

  onPage(page: PageableRequest) {
    this.pagination.size = page.size;
    this.pagination.page = page.page;
    this.postsService.triggerRefreshPosts();
  }

  onFilter(filter: PostsFilter) {
    this.filter = filter;
    this.postsService.triggerRefreshPosts();
  }
}
