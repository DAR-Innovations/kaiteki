import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { catchError, map, startWith, switchMap, tap, throwError } from 'rxjs'

import { InitialPaginationValue } from 'src/app/shared/components/paginator/paginator.component'
import {
	PageableDTO,
	PageableRequest,
} from 'src/app/shared/models/pagination.model'
import { ToastService } from 'src/app/shared/services/toastr.service'

import { TeamFilesFilter } from '../../models/team-files.dto'
import { TeamFilesService } from '../../services/team-files.service'

@Component({
	selector: 'app-files-list',
	templateUrl: './files-list.component.html',
	styleUrls: ['./files-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListComponent implements OnInit {
	filter: TeamFilesFilter = {}
	pagination: PageableDTO = InitialPaginationValue

	files$ = this.teamFilesService.refreshTeamFiles$.pipe(
		startWith([]),
		switchMap(() => this.loadTeamFiles())
	)

	constructor(
		private teamFilesService: TeamFilesService,
		private toastrService: ToastService
	) {}

	ngOnInit(): void {
		this.teamFilesService.triggerRefreshTeamFiles()
	}

	onFilter(filter: TeamFilesFilter) {
		this.filter = filter
		this.teamFilesService.triggerRefreshTeamFiles()
	}

	onPage(page: PageableRequest) {
		this.pagination.size = page.size
		this.pagination.page = page.page
		this.teamFilesService.triggerRefreshTeamFiles()
	}

	private loadTeamFiles() {
		const pageable: PageableRequest = {
			size: this.pagination.size,
			page: this.pagination.page,
		}

		return this.teamFilesService.getTeamFiles(pageable, this.filter).pipe(
			tap(res => {
				this.pagination.page = res.number
				this.pagination.size = res.size
				this.pagination.totalElements = res.totalElements
				this.pagination.totalPages = res.totalPages
			}),
			map(res => res.content),
			catchError(err => {
				this.toastrService.open('Failed to get team files')
				return throwError(() => err)
			})
		)
	}
}
