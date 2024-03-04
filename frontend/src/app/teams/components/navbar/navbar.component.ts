import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-teams-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
	tabs = [
		{ link: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
		{ link: 'tasks', label: 'Tasks', icon: 'task_alt' },
		{ link: 'chats', label: 'Chats', icon: 'chat' },
		{ link: 'meetings', label: 'Meetings', icon: 'videocam' },
		{ link: 'posts', label: 'Posts', icon: 'local_post_office' },
		{ link: 'files', label: 'Files', icon: 'folder' },
	]
}
