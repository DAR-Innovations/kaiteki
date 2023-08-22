import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarComponent {
  open = false;

  sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(
    ([_, value]) => value
  );

  teams = [{ name: 'Kaiteki' }, { name: 'Victu' }];

  constructor(private cd: ChangeDetectorRef) {}

  toggleMobileSidebar(state: boolean) {
    this.open = state;
  }
}
