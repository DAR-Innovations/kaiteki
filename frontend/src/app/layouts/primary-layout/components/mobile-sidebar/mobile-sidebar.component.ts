import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links';

@Component({
  selector: 'app-mobile-sidebar',
  templateUrl: './mobile-sidebar.component.html',
  styleUrls: ['./mobile-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarComponent implements OnInit, OnDestroy {
  open = false;
  componentActive = true;

  sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(
    ([_, value]) => value
  );

  teams = [{ name: 'Kaiteki' }, { name: 'Victu' }];

  constructor(private cd: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.open = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  toggleMobileSidebar(state: boolean) {
    this.open = state;
  }
}
