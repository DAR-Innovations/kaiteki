import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SelectedEventDialogComponent } from './selected-event-dialog.component'

describe('SelectedEventDialogComponent', () => {
	let component: SelectedEventDialogComponent
	let fixture: ComponentFixture<SelectedEventDialogComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SelectedEventDialogComponent],
		})
		fixture = TestBed.createComponent(SelectedEventDialogComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
