import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject, catchError, of, switchMap, takeUntil } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from '../../services/teams.service'
import { ActiveScreenTimeService } from '../../submodules/performance/services/active-screen-time.service'
import { PerformanceService } from '../../submodules/performance/services/performance.service'

@Component({
	selector: 'app-teams-layout',
	templateUrl: './teams-layout.component.html',
	styleUrls: ['./teams-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsLayoutComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>()

	team$ = this.teamsService.currentTeam$

	constructor(
		private activatedRoute: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private teamsService: TeamsService,
		private toastService: ToastService,
		private activeScreenTimeService: ActiveScreenTimeService,
		private performanceService: PerformanceService,
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap
			.pipe(
				switchMap(params => {
					this.activeScreenTimeService.resetTimer()

					const teamIdParam = params.get('teamId')
					if (!teamIdParam || isNaN(Number(teamIdParam))) {
						throw new Error('Invalid team ID')
					}

					return this.teamsService.getTeamById(Number(teamIdParam))
				}),
				catchError(error => {
					this.toastService.open('Failed to get team')
					return of(error)
				}),
				takeUntil(this.unsubscribe$),
			)
			.subscribe(team => {
				if (team) {
					this.teamsService.setCurrentTeam(team)
				}

				this.cd.markForCheck()
			})

		this.activeScreenTimeService.startTracking()

		this.activeScreenTimeService
			.getActiveTime()
			.pipe(
				switchMap(value => {
					if (value > 0) {
						return this.performanceService.addMemberScreenTimeMinutes(1)
					}

					return of(value)
				}),
				takeUntil(this.unsubscribe$),
			)
			.subscribe()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}
}
