import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(
    ([_, value]) => value
  );

  constructor(private cd: ChangeDetectorRef) {}

  collapsed = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.cd.markForCheck();
  }
}
