import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getFormattedFileSize } from 'src/app/shared/utils/format-file-size';

@Component({
  selector: 'app-files-table-view',
  templateUrl: './files-table-view.component.html',
  styleUrls: ['./files-table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesTableViewComponent {
  @Input() files: any[] = [];

  displayedColumns: string[] = [
    'filename',
    'createdDate',
    'type',
    'size',
    'description',
    'actions',
  ];

  onMoreClick(event: Event) {
    event.stopPropagation();
  }

  getFormattedFileSize(sizeInBytes: number) {
    return getFormattedFileSize(sizeInBytes);
  }
}
