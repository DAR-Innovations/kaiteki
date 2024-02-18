import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ChatRoomsFilter,
  CreateChatRoomDTO,
  UpdateChatRoomDTO,
} from '../models/chat-rooms.dto';
import { Observable } from 'rxjs';
import { ChatRooms } from '../models/chat-rooms.model';
import { createQueryParams } from 'src/app/shared/utils/request-params.util';
import { ChatMessages } from '../models/message.model';
import { UpdateMessageDTO } from '../models/message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatsApiService {
  private readonly baseUrl: string = '/api/v1/chats';

  constructor(private httpClient: HttpClient) {}

  getChatRooms(
    teamId: number,
    filter: ChatRoomsFilter
  ): Observable<ChatRooms[]> {
    return this.httpClient.get<ChatRooms[]>(
      `${this.baseUrl}?teamId=${teamId}`,
      {
        params: createQueryParams(filter),
      }
    );
  }

  getHistoryMessages(chatRoomId: number) {
    return this.httpClient.get<ChatMessages[]>(
      `${this.baseUrl}/${chatRoomId}/messages`
    );
  }

  getChatRoomById(teamId: number, chatRoomId: number) {
    return this.httpClient.get<ChatRooms>(`${this.baseUrl}/${chatRoomId}`, {
      params: { teamId },
    });
  }

  updateChatRoom(
    teamId: number,
    chatRoomId: number,
    updateChatRoomDTO: UpdateChatRoomDTO
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseUrl}/${chatRoomId}`,
      updateChatRoomDTO,
      {
        params: { teamId },
      }
    );
  }

  deleteChatRoom(teamId: number, chatRoomId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${chatRoomId}`, {
      params: { teamId },
    });
  }

  deleteMessage(
    teamId: number,
    chatRoomId: number,
    messageId: string
  ): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/${teamId}/${chatRoomId}/messages/${messageId}`
    );
  }

  updateMessage(
    teamId: number,
    chatRoomId: number,
    messageId: string,
    updateMessageDTO: UpdateMessageDTO
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseUrl}/${teamId}/${chatRoomId}/messages/${messageId}`,
      updateMessageDTO
    );
  }

  readAllMessages(chatRoomId: number): Observable<void> {
    return this.httpClient.post<void>(
      `${this.baseUrl}/${chatRoomId}/messages/read`,
      {}
    );
  }

  createChatRoom(
    teamId: number,
    createChatRoomDTO: CreateChatRoomDTO
  ): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}`, createChatRoomDTO, {
      params: { teamId },
    });
  }
}
