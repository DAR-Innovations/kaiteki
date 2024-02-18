import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageableDTO, PageableRequest } from '../../models/pagination.model';

export const InitialPaginationValue: PageableDTO = {
  size: 5,
  totalPages: 1,
  totalElements: 5,
  page: 0,
};

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private _pagination: PageableDTO = InitialPaginationValue;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Output() readonly onPage = new EventEmitter<PageableRequest>();
  @Input() resetFormSubject: Observable<boolean> = new Observable<boolean>();
  @Input() set pagination(value: PageableDTO) {
    this._pagination.totalElements = value.totalElements;
    this._pagination.totalPages = value.totalPages;
    this._pagination.page = value.page;
    this._pagination.size = value.size;

    if (value.page === 0) {
      this.paginator.firstPage();
    }
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
