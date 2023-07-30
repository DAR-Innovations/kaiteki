import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

export type ButtonVarinats = 'solid' | 'outline' | 'light';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
  @Input() variant: ButtonVarinats = 'solid';
  variantClass = this.getClassNameByVarinat(this.variant);

  ngOnChanges(): void {
    this.variantClass = this.getClassNameByVarinat(this.variant);
  }

  private getClassNameByVarinat(variant: ButtonVarinats) {
    switch (variant) {
      case 'solid':
        return 'bg-primary text-[#FAFAFA]';
      case 'outline':
        return 'border border-gray-300 hover:bg-gray-200';
      case 'light':
        return 'bg-gray-200 hover:bg-gray-100';
    }
  }
}
