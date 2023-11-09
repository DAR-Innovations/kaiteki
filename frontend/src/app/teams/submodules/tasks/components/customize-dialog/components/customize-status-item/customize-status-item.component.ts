import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-customize-status-item',
  templateUrl: './customize-status-item.component.html',
  styleUrls: ['./customize-status-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeStatusItemComponent {
  @Input() item: any = {};
  @Input() draggable: boolean = false;
  @Output() onChange = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  colors = [
    { label: 'Gray', hexCode: '#5B738B' },
    { label: 'Red', hexCode: '#EE3939' },
    { label: 'Orange', hexCode: '#E76500' },
    { label: 'Green', hexCode: '#36A41D' },
    { label: 'Teal', hexCode: '#049F9A' },
    { label: 'Blue', hexCode: '#1B90FF' },
    { label: 'Purple', hexCode: '#7858FF' },
    { label: 'Pink', hexCode: '#F31DED' },
    { label: 'Raspberry', hexCode: '#FA4F96' },
  ];

  onSelectColorClick(event: Event, code: string) {
    this.item.hexCode = code;
    this.onChange.emit(this.item);
  }

  onLabelChangeClick(event: Event, label: string) {
    this.item.label = label;
    this.onChange.emit(this.item);
  }

  onDeleteClick(event: Event) {
    this.onDelete.emit(this.item);
  }
}
