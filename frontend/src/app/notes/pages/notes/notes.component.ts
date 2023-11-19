import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs';
import { NotesApiServiceService } from '../../services/notes-api-service.service';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnDestroy, OnInit {
  selectedNote: any = null;
  componentActive = true;

  quillConfig: QuillModules = {
    history: true,
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['link'],
        ['clean'],
      ],
    },
  };

  form = new FormGroup({
    content: new FormControl(''),
  });

  constructor(private notesApiService: NotesApiServiceService) {}

  ngOnInit(): void {
    this.editorContent?.valueChanges
      .pipe(
        takeWhile(() => this.componentActive),
        debounceTime(500)
      )
      .subscribe((res) => this.onNoteUpdate(res));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  onSelectNote(noteId: number) {
    // this.notesApiService
    //   .getNote(noteId)
    //   .pipe(takeWhile(() => this.componentActive))
    //   .subscribe((res) => (this.selectedNote = res));

    const fetchedNote = this.notesApiService.getNote(noteId);
    if (fetchedNote) {
      this.selectedNote = fetchedNote;
      this.editorContent?.patchValue(fetchedNote.content);
    }
  }

  onNoteUpdate(updatedContent: string | null) {
    console.log(updatedContent);
  }

  get editorContent() {
    return this.form.get('content');
  }
}
