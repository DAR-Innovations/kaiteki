import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getFormattedFileSize } from 'src/app/shared/utils/format-file-size';
import { TeamFiles } from 'src/app/teams/submodules/files/models/team-files.model';

@Component({
  selector: 'app-files-list-item',
  templateUrl: './files-list-item.component.html',
  styleUrls: ['./files-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListItemComponent {
  @Input() file: TeamFiles | null = null;

  getFormattedFileSize(sizeInBytes: number) {
    return getFormattedFileSize(sizeInBytes);
  }
}
