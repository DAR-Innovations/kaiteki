import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes-sidebar',
  templateUrl: './notes-sidebar.component.html',
  styleUrls: ['./notes-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesSidebarComponent {
  notes: any[] = Array(5).fill(
    'Lorem ipsum dolor sit amet lorem e ullamcorper'
  );

  searchForm = new FormGroup({
    value: new FormControl(''),
  });
}
