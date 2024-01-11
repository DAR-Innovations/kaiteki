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

export interface ChatMessages {
  id: string;
  content: string;
  status: ChatMessageStatus;
  messageType: ChatMessagesType;
  eventType: ChatMessagesEventType;
  sentDate: Date;
  senderId: number;
  senderFullName: string;
}
