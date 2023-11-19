import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LANDING_NAVBAR_LINKS,
  LANDING_NAVIGATION_LINKS,
} from 'src/app/shared/constants/pages-links';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  navbarPages = LANDING_NAVBAR_LINKS;
  navbarPagesArr = Object.entries(LANDING_NAVIGATION_LINKS).map(
    ([_, value]) => value
  );

  menuOpen = false;

  onToggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
