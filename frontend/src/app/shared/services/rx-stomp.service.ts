import { Injectable } from '@angular/core'

import { RxStomp, RxStompConfig } from '@stomp/rx-stomp'

const rxStompConfigurations: RxStompConfig = {
	brokerURL: 'ws://localhost:8080/ws',
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
