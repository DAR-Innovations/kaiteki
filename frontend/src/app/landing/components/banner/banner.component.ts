import { ChangeDetectionStrategy, Component } from '@angular/core'

import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {
	user$ = this.authService.user$

	constructor(private authService: AuthService) {}
}
