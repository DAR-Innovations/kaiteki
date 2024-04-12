export enum ChatMessageStatus {
	DELIVERED = 'DELIVERED',
	READ = 'READ',
}

export enum ChatMessagesType {
	TEXT = 'TEXT',
}

export enum ChatMessagesEventType {
	MESSAGE = 'MESSAGE',
	UPDATE = 'UPDATE',
	DELETE = 'DELETE',
}

export enum TeamsChatNotificationType {
	NEW_MESSAGE = 'NEW_MESSAGE',
	DELETE_MESSAGE = 'DELETE_MESSAGE',
	UPDATE_MESSAGE = 'UPDATE_MESSAGE',
}

export interface ChatMessages {
	id: string
	content: string
	status: ChatMessageStatus
	messageType: ChatMessagesType
	eventType: ChatMessagesEventType
	sentDate: Date
	senderId: number
	senderFullName: string
}

export interface TeamsChatNotification {
	teamId: number
	chatRoomId: number
	timestamp: Date
	type: TeamsChatNotificationType
}
