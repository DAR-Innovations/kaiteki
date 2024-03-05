import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-verification-banner',
	templateUrl: './verification-banner.component.html',
	styleUrls: ['./verification-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationBannerComponent {}
