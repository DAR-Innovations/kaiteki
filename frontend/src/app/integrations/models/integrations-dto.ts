export interface AvailableIntegrations {
	id: number
	name: string
	description: string
	connected: boolean
	icon: string
	onConnect: () => void
	onDisconnect: () => void
}

export interface IntegrationsDTO {
	spotify?: IntegrationDetails
	telegram?: IntegrationDetails
	github?: IntegrationDetails
}

export interface IntegrationDetails {
	enabledDate: Date
	disabledDate: Date | null
	enabled: boolean
}
