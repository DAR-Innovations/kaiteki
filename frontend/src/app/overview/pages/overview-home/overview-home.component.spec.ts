import { ComponentFixture, TestBed } from '@angular/core/testing'

import { OverviewHomeComponent } from './overview-home.component'

describe('OverviewHomeComponent', () => {
	let component: OverviewHomeComponent
	let fixture: ComponentFixture<OverviewHomeComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [OverviewHomeComponent],
		})
		fixture = TestBed.createComponent(OverviewHomeComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
