import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { FilesService } from 'src/app/core/files/services/files.service'

import { getFormattedFileSize } from 'src/app/shared/utils/format-file-size'

import { TeamFiles } from '../../../models/team-files.model'

@Component({
	selector: 'app-files-table-view',
	templateUrl: './files-table-view.component.html',
	styleUrls: ['./files-table-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesTableViewComponent {
	@Input() files: TeamFiles[] = []

	displayedColumns: string[] = ['filename', 'createdDate', 'type', 'size', 'description', 'actions']

	constructor(private filesService: FilesService) {}

	onDownloadClick(file: TeamFiles) {
		this.filesService.downloadFile(file.fileId)
	}

	onMoreClick(event: Event) {
		event.stopPropagation()
	}

	getFormattedFileSize(sizeInBytes: number) {
		return getFormattedFileSize(sizeInBytes)
	}
}
