import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TaskNoteItemComponent } from './task-note-item.component'

describe('TaskNoteItemComponent', () => {
	let component: TaskNoteItemComponent
	let fixture: ComponentFixture<TaskNoteItemComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TaskNoteItemComponent],
		})
		fixture = TestBed.createComponent(TaskNoteItemComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
