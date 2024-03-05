import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { getFormattedFileSize } from 'src/app/shared/utils/format-file-size'

import { TeamFiles } from 'src/app/teams/submodules/files/models/team-files.model'

import { FilesService } from './../../../../../../../../core/files/services/files.service'

@Component({
	selector: 'app-files-list-item',
	templateUrl: './files-list-item.component.html',
	styleUrls: ['./files-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListItemComponent {
	@Input() file: TeamFiles | null = null

	constructor(private filesService: FilesService) {}

	getFormattedFileSize(sizeInBytes: number) {
		return getFormattedFileSize(sizeInBytes)
	}

	onUpdateClick() {
		throw new Error('Method not implemented.')
	}

	onDownloadClick() {
		if (!this.file) return
		this.filesService.downloadFile(this.file.fileId)
	}

	get isImage() {
		if (!this.file) return false

		const contentType = this.file.contentType
		return contentType.includes('image/')
	}
}
