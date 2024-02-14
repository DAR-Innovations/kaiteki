import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TeamFiles } from '../../../models/team-files.model';

@Component({
  selector: 'app-files-list-view',
  templateUrl: './files-list-view.component.html',
  styleUrls: ['./files-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListViewComponent {
  @Input() files: TeamFiles[] = [];
}
