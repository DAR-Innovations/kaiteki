import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CalendarView } from 'angular-calendar';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-events-filter',
  templateUrl: './events-filter.component.html',
  styleUrls: ['./events-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsFilterComponent {
  @Output() onFilter = new EventEmitter<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  views: any[] = [
    { id: CalendarView.Month, name: 'Month' },
    { id: CalendarView.Week, name: 'Week' },
    { id: CalendarView.Day, name: 'Day' },
  ];

  form = new FormGroup({
    view: new FormControl(),
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
      view: CalendarView.Week,
    };

    this.form.patchValue(initialValues);
    this.onFilter.emit(initialValues);
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((form) => {
        this.onFilter.emit({
          view: form.view,
        });
      });
  }
}
