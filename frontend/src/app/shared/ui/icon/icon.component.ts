import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const DEFAULT_SIZE = 18;

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() icon: string = 'question_mark';
  @Input() set size(size: number) {
    size = size > 0 ? size : DEFAULT_SIZE;
    this.sizeInPx = `${size}px`;
  }

  sizeInPx: string = `${DEFAULT_SIZE}px`;
}
