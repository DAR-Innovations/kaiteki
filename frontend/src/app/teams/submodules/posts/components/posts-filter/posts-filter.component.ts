import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFilterComponent {
  @Output() onFilter = new EventEmitter();
  private destroy$: Subject<void> = new Subject();

  sortings: string[] = ['Date ASC', 'Date DESC'];

  form = new FormGroup({
    searchValue: new FormControl(''),
    sort: new FormControl(),
  });

  ngOnInit() {
    this.patchInitialFormValues();
    this.trackFormValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchInitialFormValues() {
    const initialValues = {
      searchValue: '',
      sort: null,
    };

    this.form.patchValue(initialValues);
    this.onFilter.emit(initialValues);
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((form) => {
        this.onFilter.emit(form);
      });
  }
}
