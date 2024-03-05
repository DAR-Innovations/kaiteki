import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ChatComponent } from './pages/chat/chat.component'
import { ChatsComponent } from './pages/chats/chats.component'

const routes: Routes = [
	{
		path: '',
		component: ChatsComponent,
	},
	{ path: ':id', component: ChatComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ChatsRoutingModule {}
