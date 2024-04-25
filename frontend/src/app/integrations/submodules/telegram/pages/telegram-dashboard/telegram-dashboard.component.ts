import { ChangeDetectionStrategy, Component } from '@angular/core'

import { IntegrationsService } from 'src/app/integrations/services/integrations.service'

import { TelegramService } from '../../services/telegram.service'

@Component({
	selector: 'app-telegram-dashboard',
	templateUrl: './telegram-dashboard.component.html',
	styleUrl: './telegram-dashboard.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelegramDashboardComponent {
	url$ = this.telegramService.getBotLink()
	integrationKey$ = this.integrationService.getUserIntegrationCredentials()

	constructor(
		private telegramService: TelegramService,
		private integrationService: IntegrationsService,
	) {}

	onOpenUrl(url: string) {
		window.open(url, '_blank')
	}
}
