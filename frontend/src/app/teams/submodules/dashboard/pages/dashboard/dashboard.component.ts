import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'

import { Subject, catchError, map, startWith, switchMap, take, tap, throwError } from 'rxjs'

import { InitialPaginationValue } from 'src/app/shared/components/paginator/paginator.component'
import { PageableDTO, PageableRequest } from 'src/app/shared/models/pagination.model'
import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamMembersFilterDTO } from 'src/app/teams/models/team-members-filter.dto'
import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
	private refetchTeamMembersSubject = new Subject<void>()
	refetchTeamMembers$ = this.refetchTeamMembersSubject.asObservable()

	filter: TeamMembersFilterDTO = {}
	pagination: PageableDTO = InitialPaginationValue

	teamMembers$ = this.refetchTeamMembers$.pipe(
		startWith([]),
		switchMap(() => this.loadTeamMembers()),
	)

	constructor(
		private teamsService: TeamsService,
		private toastrService: ToastService,
	) {}

	ngOnInit(): void {
		this.refetchTeamMembers()
	}

	ngOnDestroy(): void {
		this.refetchTeamMembersSubject.next()
		this.refetchTeamMembersSubject.complete()
	}

	private refetchTeamMembers() {
		this.refetchTeamMembersSubject.next()
	}

	private loadTeamMembers() {
		const pagination: PageableRequest = {
			size: this.pagination.size,
			page: this.pagination.page,
		}

		return this.teamsService.searchTeamMembers(pagination, this.filter).pipe(
			tap(res => {
				this.pagination.page = res.number
				this.pagination.size = res.size
				this.pagination.totalElements = res.totalElements
				this.pagination.totalPages = res.totalPages
			}),
			map(res => res.content),
			catchError(err => {
				this.toastrService.open('Failed to get team members')
				return throwError(() => err)
			}),
		)
	}

	onFilter(filter: TeamMembersFilterDTO) {
		this.filter = filter
		this.refetchTeamMembers()
	}

	onPage(page: PageableRequest) {
		this.pagination.size = page.size
		this.pagination.page = page.page
		this.refetchTeamMembers()
	}

	onDeleteMember(id: number) {
		this.teamsService
			.deleteTeamMember(id)
			.pipe(
				catchError(err => {
					this.toastrService.open('Failed to delete team member')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastrService.open('Successfully removed team member')
				this.refetchTeamMembers()
			})
	}
}
