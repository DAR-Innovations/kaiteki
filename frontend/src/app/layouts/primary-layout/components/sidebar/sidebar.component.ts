import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  collapsed = true;
  sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(
    ([_, value]) => value
  );
  teams = [{ name: 'Kaiteki' }, { name: 'Victu' }];

  constructor(private cd: ChangeDetectorRef) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.cd.markForCheck();
  }

  openSidebar() {
    if (this.collapsed) {
      this.toggleSidebar();
    }
  }
}
