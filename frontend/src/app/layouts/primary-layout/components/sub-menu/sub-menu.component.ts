import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubMenuComponent implements OnInit, OnDestroy {
  @Input() label: string = 'Menu';
  @Input() headerIcon: string = 'tuiIconMenuLarge';
  @Input() link: string = '';
  @Input() collapsed: boolean = false;

  matchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    matrixParams: 'exact',
    queryParams: 'exact',
    fragment: 'exact',
  };

  componentActive = true;
  expanded = false;
  active = false;

  constructor(private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkIsLinkActive();
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkIsLinkActive() {
    this.router.events
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(() => {
        this.active = this.router.isActive(this.link, this.matchOptions);
        this.cd.markForCheck();
      });
  }

  onExpandedToggle(event: Event) {
    event.preventDefault();
    this.expanded = !this.expanded;
  }
}
