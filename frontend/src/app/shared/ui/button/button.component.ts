import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
} from '@angular/core'

export type ButtonVariants = 'solid' | 'outline' | 'light'

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnChanges {
	@Input() variant: ButtonVariants = 'solid'
	@Input() icon = ''
	variantClass = this.getClassNameByVariant(this.variant)

	ngOnChanges(): void {
		this.variantClass = this.getClassNameByVariant(this.variant)
	}

	private getClassNameByVariant(variant: ButtonVariants) {
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
