import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventsToolbarComponent } from './events-toolbar.component'

describe('EventsToolbarComponent', () => {
	let component: EventsToolbarComponent
	let fixture: ComponentFixture<EventsToolbarComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EventsToolbarComponent],
		})
		fixture = TestBed.createComponent(EventsToolbarComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
