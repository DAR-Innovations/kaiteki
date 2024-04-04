import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject, catchError, takeUntil, tap, throwError } from 'rxjs'

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
	isLoading = true
	isError = false
	errorMessage = ''
	team$ = this.teamsService.currentTeam$

	constructor(
		private activatedRoute: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private teamsService: TeamsService,
		private toastService: ToastService,
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap
			.pipe(
				tap(() => (this.isLoading = true)),
				catchError(err => {
					this.handleError(err)
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$),
			)
			.subscribe(params => {
				const teamIdParam = params.get('teamId')
				if (!teamIdParam) {
					this.handleError('Invalid team ID')
					return
				}

				const teamIdNumber = Number(teamIdParam)
				if (isNaN(teamIdNumber)) {
					this.handleError('Invalid team ID')
					return
				}

				this.teamsService
					.getTeamById(teamIdNumber)
					.pipe(
						tap(() => (this.isLoading = false)),
						catchError(err => {
							this.handleError(err)
							return throwError(() => err)
						}),
						takeUntil(this.unsubscribe$),
					)
					.subscribe(team => {
						this.teamsService.setCurrentTeam(team)
						this.cd.markForCheck()
					})
			})
	}

	handleError(error: string) {
		this.isLoading = false
		this.isError = true
		this.errorMessage = error
		this.toastService.open('Failed to get team')
		this.cd.markForCheck()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}
}
