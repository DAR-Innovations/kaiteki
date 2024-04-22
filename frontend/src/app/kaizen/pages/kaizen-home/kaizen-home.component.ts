import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Subject, Subscription, catchError, finalize, take, takeUntil, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { KAIZEN_MODES, KaizenRequest } from '../../models/kaizen.dto'
import { KaizenAPIService } from '../../services/kaizen-api.service'

import { KaizenService } from './../../services/kaizen.service'

@Component({
	selector: 'app-kaizen-home',
	templateUrl: './kaizen-home.component.html',
	styleUrls: ['./kaizen-home.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KaizenHomeComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>()
	private kaizenRequestSubscription = new Subscription()

	response$ = this.kaizenService.response$
	request$ = this.kaizenService.request$
	loading$ = this.kaizenService.isLoading$

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
		private kaizenService: KaizenService,
		private kaizenAPIService: KaizenAPIService,
	) {}

	ngOnInit(): void {
		this.trackFormValueChanges()
	}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()

		this.kaizenRequestSubscription.unsubscribe()
	}

	private trackFormValueChanges() {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(form => {
			if (form) {
				const selectedMode = form.mode ?? KAIZEN_MODES.CHATBOT
				if (this.currentMode !== selectedMode) {
					this.currentMode = selectedMode
					this.kaizenRequestSubscription.unsubscribe()
					this.kaizenService.resetValues()
				}
			}
		})
	}

	onSubmit() {
		const { mode, prompt } = this.form.getRawValue()

		if (!prompt || !mode) {
			this.toastService.error('Mode or prompt is missing or invalid')
			return
		}

		const dto: KaizenRequest = { prompt: prompt.trim() }

		this.kaizenService.setRequest(prompt.trim())
		this.kaizenService.setLoading(true)
		this.form.patchValue({ prompt: '', mode })

		const kaizenStrategy = this.kaizenAPIService.getKaizenResponse(dto, mode)

		if (!kaizenStrategy) {
			this.toastService.error('Mode is not supported')
			return
		}

		this.kaizenRequestSubscription = kaizenStrategy
			.pipe(
				take(1),
				catchError(error => {
					this.toastService.error('Failed to get prompt result')
					return throwError(() => error)
				}),
				finalize(() => this.kaizenService.setLoading(false)),
			)
			.subscribe(response => {
				this.kaizenService.setResponse(response.result)
			})
	}

	isVoiceAssistantMode() {
		return this.currentMode === KAIZEN_MODES.VOICE
	}

	getFormattedResponse(text: string) {
		if (this.currentMode === KAIZEN_MODES.CHATBOT) {
			const formattedText = text.split('<|assistant|>\n')[1] || ''
			return formattedText.replace(/(^\n|\n$|\n(?=[0-9]\.|\t))/g, '\n').trimStart()
		}

		return text
	}
}
