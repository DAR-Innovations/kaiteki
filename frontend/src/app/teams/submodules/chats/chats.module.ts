import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsMessageComponent } from './components/chats-message/chats-message.component';
import { ChatsSidebarComponent } from './components/chats-sidebar/chats-sidebar.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatsRoutingModule } from './chats-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ChatsComponent, ChatsMessageComponent, ChatsSidebarComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChatsRoutingModule,
  ],
})
export class ChatsModule {}
