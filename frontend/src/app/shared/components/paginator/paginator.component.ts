// import {
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   Component,
//   EventEmitter,
//   Input,
//   OnDestroy,
//   OnInit,
//   Output,
//   ViewChild,
// } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import {
//   Observable,
//   Subject,
//   debounceTime,
//   distinctUntilChanged,
//   takeUntil,
// } from 'rxjs';
// import { PageableDTO, PageableRequest } from '../../models/pagination.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import {
//   createQueryParamsOnFilter,
//   parseQueryParams,
// } from '../../utils/request-params.util';

// export const InitialPaginationValue: PageableDTO = {
//   size: 5,
//   totalPages: 20,
//   totalElements: 200,
//   page: 0,
// };

// @Component({
//   selector: 'app-paginator',
//   templateUrl: './paginator.component.html',
//   styleUrls: ['./paginator.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class PaginatorComponent implements OnInit, OnDestroy {
//   private unsubscribe$ = new Subject<void>();
//   private _pagination: PageableDTO = InitialPaginationValue;

//   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
//   @Output() readonly onPage = new EventEmitter<PageableRequest>();
//   @Input() resetFormSubject: Observable<boolean> = new Observable<boolean>();
//   @Input() set pagination(value: PageableDTO) {
//     if (value.page === 0) {
//       this.paginator.firstPage();
//     }

//     this._pagination.totalElements = value.totalElements;
//     this._pagination.totalPages = value.totalPages;
//     this._pagination.page = value.page;
//     this._pagination.size = value.size;
//   }

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private cd: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.patchInitialFormValues();
//     this.trackFormValueChanges();
//   }

//   ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }

//   emitPageValue(pageable: PageableRequest) {
//     this.onPage.emit({
//       size: pageable.size,
//       page: pageable.page,
//     });

//     this.cd.markForCheck();
//   }

//   private patchInitialFormValues() {
//     const queryParams: Partial<PageableDTO> = this.getQueryParameters();

//     this._pagination = {
//       ...this._pagination,
//       size: queryParams.size ?? InitialPaginationValue.size,
//       page: queryParams.page ?? InitialPaginationValue.page,
//     };

//     this.emitPageValue({
//       size: this._pagination.size,
//       page: this._pagination.page,
//     });
//   }

//   private trackFormValueChanges() {
//     this.paginator.page
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe((value) => {
//         const filter: PageableDTO = {
//           ...this.pagination,
//           size: value.pageSize,
//           page: value.pageIndex,
//         };

//         this.saveQueryParamters(filter);
//         this.emitPageValue(filter);
//       });
//   }

//   private saveQueryParamters(filter: PageableRequest) {
//     this.router.navigate([], {
//       queryParams: createQueryParamsOnFilter(filter),
//     });
//   }

//   private getQueryParameters() {
//     const defaultFilter: Partial<PageableDTO> = InitialPaginationValue;

//     const queryParams = this.route.snapshot.queryParams;
//     return parseQueryParams<PageableDTO>(queryParams, defaultFilter);
//   }

//   get pagination(): PageableDTO {
//     return this._pagination;
//   }
// }

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PageableDTO, PageableRequest } from '../../models/pagination.model';

export const InitialPaginationValue: PageableDTO = {
  size: 5,
  totalPages: 20,
  totalElements: 200,
  page: 0,
};

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private _pagination: PageableDTO = InitialPaginationValue;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Output() readonly onPage = new EventEmitter<PageableRequest>();
  @Input() resetFormSubject: Observable<boolean> = new Observable<boolean>();
  @Input() set pagination(value: PageableDTO) {
    if (value.page === 0) {
      this.paginator.firstPage();
    }

    this._pagination.totalElements = value.totalElements;
    this._pagination.totalPages = value.totalPages;
    this._pagination.page = value.page;
    this._pagination.size = value.size;
  }

  ngOnInit(): void {
    this.paginator.page
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.onPage.emit({
          size: value.pageSize,
          page: value.pageIndex,
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get pagination(): PageableDTO {
    return this._pagination;
  }
}
