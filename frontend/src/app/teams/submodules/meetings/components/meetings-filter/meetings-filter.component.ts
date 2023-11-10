import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-meetings-filter',
  templateUrl: './meetings-filter.component.html',
  styleUrls: ['./meetings-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsFilterComponent {
  @Output() onFilter = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  particapants: string[] = [
    'Diar Begisbayev',
    'Lana Savras',
    'Ramazan Seiitbek',
  ];
  defaultParticapants: string[] = ['My Meetings'];
  views: string[] = ['List', 'Timeline'];
  sortings: string[] = ['Date ASC', 'Date DESC'];

  form = new FormGroup({
    particapants: new FormControl([]),
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
      executor: [this.defaultParticapants[0]],
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
