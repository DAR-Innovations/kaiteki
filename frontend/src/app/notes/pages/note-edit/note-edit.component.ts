import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  EMPTY,
  Subject,
  catchError,
  debounceTime,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { NotesService } from '../../services/notes.service';
import { ActivatedRoute } from '@angular/router';
import { QuillModules } from 'ngx-quill';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { Notes } from '../../models/note.type';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditComponent implements OnDestroy {
  unsubscribe$ = new Subject<void>();
  selectedNote: Notes | null = null;

  form = new FormGroup({
    content: new FormControl(''),
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
    private notesService: NotesService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNote();

    this.editorContent.valueChanges
      .pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe((res) => this.onNoteUpdate(res));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getNote() {
    const id = this.getIdFromParams();
    if (!id) return;

    this.notesService
      .getNote(id)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() => {
          this.toastrService.open('Failed to get note');
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (!response?.body) {
          return this.toastrService.open('Failed to get note');
        }

        this.selectedNote = response.body;
        return this.editorContent.patchValue(response.body.content);
      });
  }

  private onNoteUpdate(content: string | null) {
    if (!content || !this.selectedNote) return;

    this.notesService
      .updateNote(this.selectedNote.id, { content })
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(() => {
          this.toastrService.open('Failed to save note');
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (!response) {
          return this.toastrService.open('Failed to save a note');
        }

        return null;
      });
  }

  private getIdFromParams() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (!paramId) return;

    const numberId = Number(paramId);
    if (isNaN(numberId)) return;

    return numberId;
  }

  get editorContent() {
    return this.form.get('content')!;
  }
}
