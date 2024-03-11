import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Subject, catchError, take, takeUntil, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toastr.service'

import {
	KAIZEN_MODES,
	KaizenRequest,
	KaizenResponse,
} from '../../models/kaizen.dto'

import { KaizenAPIService } from './../../services/kaizen-api.service'

@Component({
	selector: 'app-kaizen-home',
	templateUrl: './kaizen-home.component.html',
	styleUrls: ['./kaizen-home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KaizenHomeComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>()

	userRequest: string = ''
	userResponse: string = ''
	isLoading = false

	currentMode = KAIZEN_MODES.CHATBOT

	modeOptions = [
		{ id: KAIZEN_MODES.CHATBOT, label: 'Chatbot' },
		{ id: KAIZEN_MODES.SUMMARIZE, label: 'Summarize' },
		{ id: KAIZEN_MODES.PARAPHRASE, label: 'Paraphrase' },
		{ id: KAIZEN_MODES.KEYWORDS, label: 'Extract Keywords' },
		{ id: KAIZEN_MODES.VOICE, label: 'Voice Assistant' },
	]

	form = new FormGroup({
		mode: new FormControl(KAIZEN_MODES.CHATBOT, [Validators.required]),
		prompt: new FormControl('', [
			Validators.required,
			Validators.minLength(2),
			Validators.maxLength(4048),
		]),
	})

	constructor(
		private toastService: ToastService,
		private kaizenAPIService: KaizenAPIService
	) {}

	ngOnInit(): void {
		this.trackFormValueChanges()
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
	}

	private trackFormValueChanges() {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(form => {
			if (form) {
				const selectedMode = form.mode ?? KAIZEN_MODES.CHATBOT
				if (this.currentMode !== selectedMode) {
					this.currentMode = selectedMode
				}
			}
		})
	}

	onSubmit() {
		const { mode, prompt } = this.form.getRawValue()

		if (!mode || !prompt) {
			this.toastService.error('Mode or prompt is missing')
			return
		}

		this.userRequest = prompt
		this.isLoading = true
		this.form.patchValue({ prompt: '', mode: mode })

		const dto: KaizenRequest = {
			prompt: prompt.trim(),
		}

		switch (mode) {
			case KAIZEN_MODES.CHATBOT:
				this.kaizenAPIService
					.promptChatbot(dto)
					.pipe(take(1), catchError(this.handleError))
					.subscribe(this.handlePromptResponse)
				break
			case KAIZEN_MODES.KEYWORDS:
				this.kaizenAPIService
					.extractKeywords(dto)
					.pipe(take(1), catchError(this.handleError))
					.subscribe(this.handlePromptResponse)
				break
			case KAIZEN_MODES.SUMMARIZE:
				this.kaizenAPIService
					.summarizeText(dto)
					.pipe(take(1), catchError(this.handleError))
					.subscribe(this.handlePromptResponse)
				break
			default:
				this.toastService.error('Mode is not supported')
				break
		}
	}

	private handleError(err: any) {
		this.toastService.error('Failed to get prompt result')
		this.isLoading = false
		return throwError(() => err)
	}

	private handlePromptResponse(dto: KaizenResponse) {
		const result = dto.result
		this.userResponse = result
		this.isLoading = false
	}

	isVoiceAssistantMode() {
		return this.currentMode === KAIZEN_MODES.VOICE
	}
}
