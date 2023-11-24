import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFilterComponent {
  @Output() onFilter = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  views: string[] = ['Table', 'Cards'];
  sortings: string[] = [
    'Priority ASC',
    'Prioriy DESC',
    'Date ASC',
    'Date DESC',
  ];

  form = new FormGroup({
    searchValue: new FormControl(''),
    view: new FormControl(),
    sort: new FormControl(),
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
      view: this.views[0],
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
