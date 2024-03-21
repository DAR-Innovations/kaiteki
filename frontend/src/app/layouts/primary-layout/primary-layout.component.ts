import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-primary-layout',
	templateUrl: './primary-layout.component.html',
	styleUrls: ['./primary-layout.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryLayoutComponent implements OnInit {
	draggableSidebarItems = ['Spotify', 'Kaizen']

	constructor(private teamsService: TeamsService) {}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(
			this.draggableSidebarItems,
			event.previousIndex,
			event.currentIndex
		)
	}

	ngOnInit(): void {
		this.teamsService.refetchTeams()
	}
}
