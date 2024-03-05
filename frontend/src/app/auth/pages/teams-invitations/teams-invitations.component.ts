import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject, catchError, finalize, tap, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toastr.service'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-teams-invitations',
	templateUrl: './teams-invitations.component.html',
	styleUrls: ['./teams-invitations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsInvitationsComponent {
	private unsubscribe$ = new Subject<void>()

	isLoading = true
	isSuccess = false

	constructor(
		private teamsService: TeamsService,
		private authService: AuthService,
		private route: ActivatedRoute,
		private cd: ChangeDetectorRef,
		private toastrService: ToastService
	) {}

	ngOnInit(): void {
		this.handleToken()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	private handleToken() {
		const token = this.route.snapshot.paramMap.get('invitationToken')
		if (!token) return

		this.teamsService
			.joinTeamByLink(token)
			.pipe(
				tap(() => {
					this.isLoading = true
					this.isSuccess = false
				}),
				catchError(err => {
					this.isSuccess = false
					this.toastrService.open('Failed to join team')
					return throwError(() => err)
				}),
				finalize(() => {
					this.isLoading = false
					this.cd.markForCheck()
				})
			)
			.subscribe(() => {
				this.isSuccess = true
				this.toastrService.open('Successfully joined to the team')
				this.cd.markForCheck()
			})
	}
}
