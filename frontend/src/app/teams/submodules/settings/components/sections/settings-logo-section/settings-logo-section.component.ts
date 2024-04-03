import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { FileUploadValidators } from '@iplab/ngx-file-upload'
import { catchError, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { UpdateTeamDTO } from 'src/app/teams/models/teams.model'
import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-settings-logo-section',
	templateUrl: './settings-logo-section.component.html',
	styleUrl: './settings-logo-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsLogoSectionComponent implements OnInit {
	form = new FormGroup({
		files: new FormControl<File[]>([], [FileUploadValidators.filesLimit(1)]),
	})
	selectedFile: File | null = null
	previewUrl: string | null = null

	constructor(
		private toastService: ToastService,
		private teamsService: TeamsService,
	) {}

	ngOnInit() {
		this.form.get('files')?.valueChanges.subscribe(files => {
			if (files && files.length > 0) {
				this.selectedFile = files[0]
				if (this.selectedFile) {
					this.onPreviewLogoChange(this.selectedFile)
				}
			} else {
				this.selectedFile = null
				this.previewUrl = null
			}
		})
	}

	onSubmit() {
		const { files } = this.form.getRawValue()
		const file = files?.[0] ?? undefined

		if (!file) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: UpdateTeamDTO = {
			logo: file,
		}

		this.teamsService
			.updateTeam(dto)
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to update team logo')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully updated team logo')
				this.teamsService.refetchCurrentTeam()
			})
	}

	onPreviewLogoChange(file: File) {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => {
			this.previewUrl = reader.result as string
		}
	}
}
