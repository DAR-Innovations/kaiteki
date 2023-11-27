import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-posts-list-view',
  templateUrl: './posts-list-view.component.html',
  styleUrls: ['./posts-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListViewComponent {
  @Input() posts: any[] = [];
}
