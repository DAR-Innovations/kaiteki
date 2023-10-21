import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichEditorComponent {
  editor = Editor;
  config: EditorConfig = {
    placeholder: 'Describe the task',
    toolbar: {
      shouldNotGroupWhenFull: true,
    },
  };
}
