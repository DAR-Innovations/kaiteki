import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teams-layout',
  templateUrl: './teams-layout.component.html',
  styleUrls: ['./teams-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsLayoutComponent implements OnInit, OnDestroy {
  teamName: string = 'Teams';
  teamNameSubs: Subscription | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.teamNameSubs = this.activatedRoute.paramMap.subscribe((params) => {
      this.teamName = params.get('id') ?? '';
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.teamNameSubs?.unsubscribe();
  }
}
