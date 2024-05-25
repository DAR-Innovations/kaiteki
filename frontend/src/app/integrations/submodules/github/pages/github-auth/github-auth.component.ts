import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-github-auth',
	templateUrl: './github-auth.component.html',
	styleUrl: './github-auth.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubAuthComponent {
	// isLoading = true
	// isSuccess = false
	// constructor(
	// 	private githubService: GithubService,
	// 	private route: ActivatedRoute,
	// 	private cd: ChangeDetectorRef,
	// 	private toastService: ToastService,
	// 	private integrationsService: IntegrationsService,
	// ) {}
	// ngOnInit(): void {
	// 	this.handleAuth()
	// }
	// private handleAuth() {
	// 	const code = this.route.snapshot.queryParamMap.get('code')
	// 	if (!code) return
	// 	this.githubService
	// 		.handleAuthCode(code)
	// 		.pipe(
	// 			tap(() => {
	// 				this.isLoading = true
	// 				this.isSuccess = false
	// 			}),
	// 			catchError(err => {
	// 				this.isSuccess = false
	// 				this.toastService.error('Failed to log in GitHub')
	// 				return throwError(() => err)
	// 			}),
	// 			finalize(() => {
	// 				this.isLoading = false
	// 				this.cd.markForCheck()
	// 			}),
	// 		)
	// 		.subscribe(() => {
	// 			this.isSuccess = true
	// 			this.toastService.open('Successfully integrated with GitHub')
	// 			this.integrationsService.refreshIntegrations()
	// 			this.cd.markForCheck()
	// 		})
	// }
}
