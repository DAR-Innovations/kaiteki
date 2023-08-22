import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  tabs = [
    { link: 'tasks', label: 'Tasks', icon: 'tuiIconCheckSquareLarge' },
    { link: 'chats', label: 'Chats', icon: 'tuiIconMessageCircleLarge' },
    { link: 'meetings', label: 'Meetings', icon: 'tuiIconVideoLarge' },
    { link: 'posts', label: 'Posts', icon: 'tuiIconBookOpenLarge' },
  ];
}
