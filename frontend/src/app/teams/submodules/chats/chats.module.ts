import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsMessageComponent } from './components/chats-message/chats-message.component';
import { ChatsSidebarComponent } from './components/chats-sidebar/chats-sidebar.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatsRoutingModule } from './chats-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatService } from './services/chat-service.service';
import { CreateGroupDialogComponent } from './components/dialogs/create-group-dialog/create-group-dialog.component';
import { CreateSingleDialogComponent } from './components/dialogs/create-single-dialog/create-single-dialog.component';

@NgModule({
  declarations: [
    ChatsComponent,
    ChatsMessageComponent,
    ChatsSidebarComponent,
    ChatRoomComponent,
    ChatComponent,
    CreateGroupDialogComponent,
    CreateSingleDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChatsRoutingModule,
  ],
  providers: [ChatService],
})
export class ChatsModule {}
