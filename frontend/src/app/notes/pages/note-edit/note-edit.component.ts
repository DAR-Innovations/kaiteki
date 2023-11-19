import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs';
import { NotesApiServiceService } from '../../services/notes-api-service.service';
import { ActivatedRoute } from '@angular/router';
import { QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditComponent {
  selectedNote: any = null;
  componentActive = true;

  form = new FormGroup({
    content: new FormControl(this.selectedNote),
  });

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

  constructor(
    private notesApiService: NotesApiServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getNote();

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

  private getNote() {
    const id = this.getIdFromParams();
    if (!id) return;

    const fetchedNote = this.notesApiService.getNote(id);
    if (fetchedNote) {
      this.selectedNote = fetchedNote;
      this.editorContent?.patchValue(fetchedNote.content);
    }
  }

  private onNoteUpdate(content: string | null) {
    console.log(content);
  }

  private getIdFromParams() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (!paramId) return;

    const numberId = Number(paramId);
    if (isNaN(numberId)) return;

    return numberId;
  }

  get editorContent() {
    return this.form.get('content');
  }
}
