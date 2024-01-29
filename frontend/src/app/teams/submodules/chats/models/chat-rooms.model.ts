export enum ChatRoomsType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
}

export interface ChatRooms {
  id: number;
  name: string;
  type: ChatRoomsType;
  iconId: number | null;
  size: number;
  lastMessageContent: string | null;
  lastMessageDate: Date | null;
  membersIds: number[];
}
