import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnDestroy, OnInit {
  form = new FormGroup({
    content: new FormControl('|'),
  });

  editor = Editor;
  config: EditorConfig = {
    toolbar: {
      shouldNotGroupWhenFull: true,
    },
  };

  ngOnInit(): void {
    this.form
      .get('content')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((res) => console.log(res));
  }

  ngOnDestroy(): void {}
}
