import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import {
  MeetingsFilter,
  MeetingsSort,
  MeetingsView,
} from '../../models/meetings.types';

@Component({
  selector: 'app-meetings-filter',
  templateUrl: './meetings-filter.component.html',
  styleUrls: ['./meetings-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsFilterComponent {
  @Output() onFilter = new EventEmitter<MeetingsFilter>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  particapants: any[] = [
    { id: 1, name: 'Diar Begisbayev' },
    { id: 2, name: 'Lana Savras' },
    { id: 3, name: 'Ramazan Seiitbek' },
  ];
  views: any[] = [
    { id: MeetingsView.LIST, name: 'List' },
    { id: MeetingsView.CALENDAR, name: 'Calendar' },
  ];
  sortings: any[] = [
    { id: MeetingsSort.DATE_ASC, name: 'Date ASC' },
    { id: MeetingsSort.DATE_DESC, name: 'Date DESC' },
  ];

  form = new FormGroup({
    particapants: new FormControl<number[]>([]),
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
      particapants: [1],
      view: MeetingsView.CALENDAR,
      sort: MeetingsSort.DATE_DESC,
    };
    this.form.patchValue(initialValues);
    this.onFilter.emit(initialValues);
  }

  private trackFormValueChanges() {
    this.form.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((form) => {
        this.onFilter.emit({
          particapants: form.particapants as [],
          view: form.view,
          sort: form.sort,
        });
      });
  }
}
