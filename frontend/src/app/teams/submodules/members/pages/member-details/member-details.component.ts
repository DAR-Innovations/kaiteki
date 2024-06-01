import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-member-details',
	templateUrl: './member-details.component.html',
	styleUrl: './member-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailsComponent implements OnInit {
	memberId: null | number = null

	constructor(
		private route: ActivatedRoute,
		private location: Location,
	) {}

	ngOnInit(): void {
		this.memberId = this.getIdFromParams()
	}

	private getIdFromParams() {
		const paramId = this.route.snapshot.paramMap.get('id')

		if (!paramId) {
			this.location.back()
		}

		const numberId = Number(paramId)

		if (isNaN(numberId)) {
			this.location.back()
		}

		return numberId
	}
}
