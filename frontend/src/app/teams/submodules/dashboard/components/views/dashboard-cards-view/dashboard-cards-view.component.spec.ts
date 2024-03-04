import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DashboardCardsViewComponent } from './dashboard-cards-view.component'

describe('DashboardCardsViewComponent', () => {
	let component: DashboardCardsViewComponent
	let fixture: ComponentFixture<DashboardCardsViewComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DashboardCardsViewComponent],
		})
		fixture = TestBed.createComponent(DashboardCardsViewComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
