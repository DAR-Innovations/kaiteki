import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import mimesDB from 'mime-db'

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

	onDownloadClick() {
		if (!this.file) return
		this.filesService.downloadFile(this.file.fileId)
	}

	get fileType() {
		if (!this.file) return 'Document'

		return mimesDB[this.file.contentType].extensions?.[0].toLocaleUpperCase() ?? 'Document'
	}

	get isImage() {
		if (!this.file) return false

		const contentType = this.file.contentType
		return contentType.includes('image/')
	}
}
