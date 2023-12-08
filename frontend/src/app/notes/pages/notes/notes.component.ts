import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, Subject, catchError, debounceTime, takeUntil } from 'rxjs';
import { QuillModules } from 'ngx-quill';
import { NotesService } from '../../services/notes.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnDestroy, OnInit {
  unsubscribe$ = new Subject<void>();

  selectedNote: any = null;

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

  constructor(
    private notesService: NotesService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.notesService.demo().subscribe((d) => console.log(d));

    this.editorContent.valueChanges
      .pipe(debounceTime(500), takeUntil(this.unsubscribe$))
      .subscribe((res) => this.onNoteUpdate(res));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelectNote(noteId: number) {
    this.notesService
      .getNote(noteId)
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

  get editorContent() {
    return this.form.get('content')!;
  }
}
