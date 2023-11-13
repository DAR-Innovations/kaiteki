import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsMessageComponent } from './components/chats-message/chats-message.component';
import { ChatsSidebarComponent } from './components/chats-sidebar/chats-sidebar.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatsRoutingModule } from './chats-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatService } from './services/chat-service.service';
import { CreateChatDialogComponent } from './components/dialogs/create-chat-dialog/create-chat-dialog.component';

@NgModule({
  declarations: [
    ChatsComponent,
    ChatsMessageComponent,
    ChatsSidebarComponent,
    ChatRoomComponent,
    ChatComponent,
    CreateChatDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChatsRoutingModule,
  ],
  providers: [ChatService],
})
export class ChatsModule {}
