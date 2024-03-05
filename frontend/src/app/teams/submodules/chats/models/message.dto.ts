import { ChatMessagesType } from './message.model'

export interface CreateMessageDTO {
	content: string
	type: ChatMessagesType
	senderId: number
}

export interface UpdateMessageDTO {
	content: string
}
