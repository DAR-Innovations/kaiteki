import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes-sidebar',
  templateUrl: './notes-sidebar.component.html',
  styleUrls: ['./notes-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesSidebarComponent {
  @Output() selectedNoteId = new EventEmitter<number>();
  selectedNote: any = null;

  // notes: any[] = Array(5).fill(
  //   'Lorem ipsum dolor sit amet lorem e ullamcorper'
  // );

  notes: any[] = [
    {
      id: 1,
      title: 'Hello World',
      content:
        '<h2 class="ql-align-center">Hello World</h2><p class="ql-align-center">&nbsp;</p><p class="ql-align-justify">Today I would like to share with you this information</p><p class="ql-align-justify">dadadadasd</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><ul><li class="ql-align-justify">21231312</li></ul><p class="ql-align-justify"><br></p><ol><li class="ql-align-justify">312312312sda</li></ol><p class="ql-align-justify"><br></p><p class="ql-align-right">dasdasdasdassdasdasdsada</p><p class="ql-align-right"><br></p><p class="ql-align-right"><a href="http://localhost:4200/asdasdas" rel="noopener noreferrer" target="_blank">sadada</a></p><p><br></p>',
    },
    {
      id: 2,
      title: 'The second assignment',
      content:
        '<h3>The second Assignment</h3><p>&nbsp;</p><p>List:<br>1. Go to Shop</p><p>2. Lets Go to school</p><p>&nbsp;</p>',
    },
    {
      id: 3,
      title: 'The third one',
      content:
        '<h2 style="text-align:right;">The thrid one</h2><p style="text-align:right;">&nbsp;</p><blockquote><p style="text-align:justify;">The using quotes</p></blockquote><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Using LINKS - <a href="https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone">link</a></p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;"><mark class="marker-yellow">I want to implement also higlihjtinh</mark></p><p style="text-align:justify;">&nbsp;</p>',
    },
  ];

  searchForm = new FormGroup({
    value: new FormControl(''),
  });

  onSelectNote(note: any) {
    if (note) {
      this.selectedNoteId.emit(note.id);
      this.selectedNote = note;
    }
  }
}
