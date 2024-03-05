import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EventsWeekViewComponent } from './events-week-view.component'

describe('EventsWeekViewComponent', () => {
	let component: EventsWeekViewComponent
	let fixture: ComponentFixture<EventsWeekViewComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [EventsWeekViewComponent],
		})
		fixture = TestBed.createComponent(EventsWeekViewComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
