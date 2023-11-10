import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  Subject,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

@Component({
  selector: 'app-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFilterComponent implements OnInit, OnDestroy {
  @Output() onFilter = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  executors: string[] = ['Diar Begisbayev', 'Lana Savras', 'Ramazan Seiitbek'];
  defaultExecutors: string[] = ['My Tasks', 'All Assigned', 'All Unassigned'];
  views: string[] = ['List', 'Kanban', 'Table'];
  sortings: string[] = [
    'Priority ASC',
    'Prioriy DESC',
    'Date ASC',
    'Date DESC',
  ];

  form = new FormGroup({
    executor: new FormControl(),
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
      executor: this.defaultExecutors[0],
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
