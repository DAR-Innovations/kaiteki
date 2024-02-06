import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent {
  draggableSidebarItems = ['Spotify', 'Kaizen'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.draggableSidebarItems,
      event.previousIndex,
      event.currentIndex
    );
  }
}
