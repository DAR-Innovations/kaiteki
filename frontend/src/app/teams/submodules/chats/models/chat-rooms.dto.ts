import { ChatRoomsType } from './chat-rooms.model'

export interface ChatRoomsFilter {
	searchValue?: string
}

export interface CreateChatRoomDTO {
	name: string
	type: ChatRoomsType
	teamMembersIds: number[]
}

export interface UpdateChatRoomDTO {
	name: string
	teamMembersIds: number[]
}
