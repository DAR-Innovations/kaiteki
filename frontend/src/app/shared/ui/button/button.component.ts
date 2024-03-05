import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
} from '@angular/core'

export type ButtonVarinats = 'solid' | 'outline' | 'light'

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
	@Input() variant: ButtonVarinats = 'solid'
	@Input() icon: string = ''
	variantClass = this.getClassNameByVarinat(this.variant)

	ngOnChanges(): void {
		this.variantClass = this.getClassNameByVarinat(this.variant)
	}

	private getClassNameByVarinat(variant: ButtonVarinats) {
		switch (variant) {
			case 'solid':
				return 'variant-solid'
			case 'outline':
				return 'variant-outline'
			case 'light':
				return 'variant-light'
		}
	}
}
