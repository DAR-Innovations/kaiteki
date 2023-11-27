import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getFormattedFileSize } from 'src/app/shared/utils/format-file-size';

@Component({
  selector: 'app-files-list-item',
  templateUrl: './files-list-item.component.html',
  styleUrls: ['./files-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListItemComponent {
  @Input() file: any = null;

  getFormattedFileSize(sizeInBytes: number) {
    return getFormattedFileSize(sizeInBytes);
  }
}
