import { Injectable } from '@angular/core'

import { RxStomp, RxStompConfig } from '@stomp/rx-stomp'
import { environment } from 'src/environments/environment'

const protocol = environment.production ? 'wss' : 'ws'

const rxStompConfigurations: RxStompConfig = {
	brokerURL: `${protocol}://${environment.apiHost}/ws`,
	heartbeatIncoming: 0,
	heartbeatOutgoing: 20000,
	reconnectDelay: 200,
	debug: (msg: string): void => {
		console.log(new Date(), msg)
	},
}

@Injectable({
	providedIn: 'root',
})
export class RxStompService extends RxStomp {
	constructor() {
		super()
	}
}

export function rxStompServiceFactory() {
	const rxStomp = new RxStompService()
	rxStomp.configure(rxStompConfigurations)
	rxStomp.activate()
	return rxStomp
}
