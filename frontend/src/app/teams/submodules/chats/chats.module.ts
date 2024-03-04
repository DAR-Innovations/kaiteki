import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { ChatsRoutingModule } from './chats-routing.module'
import { ChatRoomComponent } from './components/chat-room/chat-room.component'
import { ChatsMessageComponent } from './components/chats-message/chats-message.component'
import { ChatsSidebarComponent } from './components/chats-sidebar/chats-sidebar.component'
import { CreateGroupDialogComponent } from './components/dialogs/create-group-dialog/create-group-dialog.component'
import { CreateSingleDialogComponent } from './components/dialogs/create-single-dialog/create-single-dialog.component'
import { UpdateChatDialogComponent } from './components/dialogs/update-chat-dialog/update-chat-dialog.component'
import { ChatComponent } from './pages/chat/chat.component'
import { ChatsComponent } from './pages/chats/chats.component'
import { ChatsService } from './services/chats.service'

@NgModule({
	declarations: [
		ChatsComponent,
		ChatsMessageComponent,
		ChatsSidebarComponent,
		ChatRoomComponent,
		ChatComponent,
		CreateGroupDialogComponent,
		CreateSingleDialogComponent,
		UpdateChatDialogComponent,
	],
	imports: [CommonModule, SharedModule, ChatsRoutingModule],
	providers: [ChatsService],
})
export class ChatsModule {}
