import { ChangeDetectionStrategy, Component } from '@angular/core'

import { delay } from 'rxjs'

import { TelegramService } from '../../services/telegram.service'

@Component({
	selector: 'app-telegram-dashboard',
	templateUrl: './telegram-dashboard.component.html',
	styleUrl: './telegram-dashboard.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelegramDashboardComponent {
	url$ = this.telegramService.getBotLink().pipe(delay(500))

	constructor(private telegramService: TelegramService) {}

	onOpenUrl(url: string) {
		window.open(url, '_blank')
	}
}
