import { Location } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { catchError, of, take, throwError } from 'rxjs'

import { GithubActivityEnum } from '../../models/github-dto.models'
import { GithubService } from '../../services/github.service'

import { ToastService } from './../../../../../shared/services/toast.service'

@Component({
	selector: 'app-github-repo',
	templateUrl: './github-repo.component.html',
	styleUrl: './github-repo.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubRepoComponent {
	repo$ = this.getRepo()

	constructor(
		private githubService: GithubService,
		private route: ActivatedRoute,
		private toastService: ToastService,
		private location: Location,
	) {}

	private getRepo() {
		const repositoryName = this.route.snapshot.paramMap.get('repoName')

		if (!repositoryName) return of(null)

		return this.githubService.getRepoDetails(repositoryName).pipe(
			take(1),
			catchError(err => {
				this.toastService.open('Failed to get repository details')
				return throwError(() => err)
			}),
		)
	}

	navigateToUrl(url: string) {
		window.open(url, '_blank')
	}

	getTitleByActivity(activity: GithubActivityEnum) {
		switch (activity) {
			case GithubActivityEnum.BRANCH_CREATION:
				return 'Creating a new branch'
			case GithubActivityEnum.BRANCH_DELETION:
				return 'Deleting an existing branch'
			case GithubActivityEnum.FORCE_PUSH:
				return 'Force push to repository'
			case GithubActivityEnum.PUSH:
				return 'Push to repository'
			case GithubActivityEnum.PR_MERGE:
				return 'Pull request merged'
			case GithubActivityEnum.MR_QUEUE_MR:
				return 'Merge queue creation'
		}
	}

	onNavigateBack() {
		this.location.back()
	}
}
