import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-files-filter',
  templateUrl: './files-filter.component.html',
  styleUrls: ['./files-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesFilterComponent {
  @Output() onFilter = new EventEmitter<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  views: any[] = [
    { id: 'list', name: 'List' },
    { id: 'table', name: 'Table' },
  ];
  sortings: any[] = [
    { id: 'date_asc', name: 'Date ASC' },
    { id: 'date_desc', name: 'Date DESC' },
  ];

  form = new FormGroup({
    searchValue: new FormControl(''),
    view: new FormControl(''),
    sort: new FormControl(''),
  });

  ngOnInit() {
    this.patchInitialFormValues();
    this.trackFormValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  private patchInitialFormValues() {
    const initialValues = {
      searchValue: '',
      view: 'list',
      sort: 'date_desc',
    };
    this.form.patchValue(initialValues);
    this.onFilter.emit(initialValues);
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((form) => {
        this.onFilter.emit({
          searchValue: form.searchValue,
          view: form.view,
          sort: form.sort,
        });
      });
  }
}
