import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KAIZEN_MODES } from '../../models/kaizen.dto';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-kaizen-home',
  templateUrl: './kaizen-home.component.html',
  styleUrls: ['./kaizen-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KaizenHomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  currentMode = KAIZEN_MODES.CHATBOT;

  modeOptions = [
    { id: KAIZEN_MODES.CHATBOT, label: 'Chatbot' },
    { id: KAIZEN_MODES.SUMMARIZE, label: 'Summarize' },
    { id: KAIZEN_MODES.PARAPHRASE, label: 'Paraphrase' },
    { id: KAIZEN_MODES.KEYWORDS, label: 'Extract Keywords' },
    { id: KAIZEN_MODES.VOICE, label: 'Voice Assistant' },
  ];

  form = new FormGroup({
    mode: new FormControl(KAIZEN_MODES.CHATBOT, [Validators.required]),
    prompt: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4048),
    ]),
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((form) => {
      if (form) {
        const selectedMode = form.mode ?? KAIZEN_MODES.CHATBOT;
        if (this.currentMode !== selectedMode) {
          this.currentMode = selectedMode;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    console.log(this.form.value);
  }

  isVoiceAssistantMode() {
    return this.currentMode === KAIZEN_MODES.VOICE;
  }
}
