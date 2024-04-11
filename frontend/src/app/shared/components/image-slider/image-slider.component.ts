import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'

interface SlideItem {
	url: string
}

@Component({
	selector: 'app-image-slider',
	templateUrl: './image-slider.component.html',
	styleUrl: './image-slider.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSliderComponent implements OnInit {
	@Input() slides: SlideItem[] = []
	@Input() animationSpeed = 500
	@Input() autoPlay = false
	@Input() autoPlaySpeed = 3000
	currentSlide = 0
	hidden = false

	constructor(private cd: ChangeDetectorRef) {}
	next() {
		const currentSlide = (this.currentSlide + 1) % this.slides.length
		this.jumpToSlide(currentSlide)
	}

	previous() {
		const currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length
		this.jumpToSlide(currentSlide)
	}

	jumpToSlide(index: number) {
		this.hidden = true
		setTimeout(() => {
			this.currentSlide = index
			this.hidden = false
			this.cd.markForCheck()
		}, this.animationSpeed)
	}

	ngOnInit() {
		if (this.autoPlay) {
			setInterval(() => {
				this.next()
				this.cd.markForCheck()
			}, this.autoPlaySpeed)
		}
	}
}
