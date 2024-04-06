import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject, catchError, of, switchMap, takeUntil, tap } from 'rxjs'

import { RequestLoadingState } from 'src/app/shared/models/loading.model'
import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from '../../services/teams.service'

@Component({
	selector: 'app-teams-layout',
	templateUrl: './teams-layout.component.html',
	styleUrls: ['./teams-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsLayoutComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>()

	team$ = this.teamsService.currentTeam$
	loadingState: RequestLoadingState = {
		loading: true,
	}

	constructor(
		private activatedRoute: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private teamsService: TeamsService,
		private toastService: ToastService,
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap
			.pipe(
				tap(() => {
					this.loadingState = { loading: true }
				}),
				switchMap(params => {
					const teamIdParam = params.get('teamId')
					if (!teamIdParam || isNaN(Number(teamIdParam))) {
						throw new Error('Invalid team ID')
					}

					return this.teamsService.getTeamById(Number(teamIdParam))
				}),
				catchError(error => {
					this.toastService.open('Failed to get team')
					this.loadingState = { loading: false, error: error }
					return of(null)
				}),
				tap(() => (this.loadingState = { loading: false })),
				takeUntil(this.unsubscribe$),
			)
			.subscribe(team => {
				if (team) {
					this.teamsService.setCurrentTeam(team)
				}

				this.cd.markForCheck()
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}
}
