export enum EventTypes {
	MEETING = 'MEETING',
	TASK = 'TASK',
}

export interface Events {
	id: number
	title: string
	description: string
	start: Date
	end: Date
	type: EventTypes
}
