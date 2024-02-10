import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Posts } from '../../models/posts.model';
import {
  of,
  Observable,
  map,
  tap,
  catchError,
  throwError,
  takeUntil,
  Subject,
  distinctUntilChanged,
} from 'rxjs';
import { PostsFilter } from '../../models/post.dto';
import {
  PageableDTO,
  PageableRequest,
} from 'src/app/shared/models/pagination.model';
import { initialPaginationValue } from 'src/app/shared/components/paginator/paginator.component';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  postsRefreshTrigger$ = this.postsService.refreshPosts$;
  filter: PostsFilter = {};
  pagination: PageableDTO = initialPaginationValue;

  posts$: Observable<Posts[]> = this.loadPosts();
  likedPosts$: Observable<Posts[]> = this.loadLikedPosts();

  constructor(
    private postsService: PostsService,
    private toastrService: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.trackRefreshPosts();
  }

  private trackRefreshPosts() {
    this.postsRefreshTrigger$
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.posts$ = this.loadPosts();
        this.likedPosts$ = this.loadLikedPosts();
        this.cd.markForCheck();
      });
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
    // TODO: Create own pagiation for liked posts
    const pageable: PageableRequest = {
      size: 5,
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

  onFilter(filter: PostsFilter) {
    this.filter = filter;
    this.posts$ = this.loadPosts();
    this.cd.markForCheck();
  }
}
