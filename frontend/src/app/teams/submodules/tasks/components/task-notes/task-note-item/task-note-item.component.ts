import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core'

import { take } from 'rxjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { TaskNotesDTO } from '../../../models/task-notes.dto'

@Component({
	selector: 'app-task-note-item[note]',
	templateUrl: './task-note-item.component.html',
	styleUrls: ['./task-note-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskNoteItemComponent implements OnInit {
	@Output() delete = new EventEmitter<number>()
	@Input() note!: TaskNotesDTO

	isEditable = false

	constructor(private teamsService: TeamsService) {}

	ngOnInit(): void {
		this.checkIfEditable()
	}

	deleteNote(noteId: number) {
		this.delete.emit(noteId)
	}

	checkIfEditable() {
		this.teamsService.currentTeamMember$.pipe(take(1)).subscribe(teamMember => {
			if (teamMember) {
				this.isEditable = teamMember.id === this.note.teamMemberId
			}
		})
	}
}
