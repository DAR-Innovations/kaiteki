import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Subject, distinctUntilChanged, takeUntil } from 'rxjs'

import { SaveTaskStatusDTO } from 'src/app/teams/submodules/tasks/models/customize-task.dto'

@Component({
	selector: 'app-customize-status-item[status]',
	templateUrl: './customize-status-item.component.html',
	styleUrls: ['./customize-status-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeStatusItemComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>()

	@Input() status!: SaveTaskStatusDTO
	@Input() draggable = false
	@Input() showMoreButton = false
	@Output() statusChange = new EventEmitter<SaveTaskStatusDTO>()
	@Output() statusDelete = new EventEmitter<SaveTaskStatusDTO>()

	statusNameFormControl = new FormControl('', [Validators.required])

	colors = [
		{ label: 'Gray', hexCode: '#5B738B' },
		{ label: 'Red', hexCode: '#EE3939' },
		{ label: 'Orange', hexCode: '#E76500' },
		{ label: 'Green', hexCode: '#36A41D' },
		{ label: 'Teal', hexCode: '#049F9A' },
		{ label: 'Blue', hexCode: '#1B90FF' },
		{ label: 'Purple', hexCode: '#7858FF' },
		{ label: 'Pink', hexCode: '#F31DED' },
		{ label: 'Raspberry', hexCode: '#FA4F96' },
	]

	ngOnInit() {
		this.statusNameFormControl.patchValue(this.status.name)

		this.statusNameFormControl.valueChanges
			.pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
			.subscribe(value => {
				if (value) {
					this.status.name = value
					this.statusChange.emit(this.status)
				}
			})
	}

	ngOnDestroy() {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	onSelectColor(event: Event, code: string) {
		event.preventDefault()
		this.status.color = code
		this.statusChange.emit(this.status)
	}

	onDeleteClick(event: Event) {
		event.preventDefault()
		this.statusDelete.emit(this.status)
	}
}
