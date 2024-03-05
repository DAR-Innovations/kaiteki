import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IntegrationsListComponent } from './integrations-list.component'

describe('IntegrationsListComponent', () => {
	let component: IntegrationsListComponent
	let fixture: ComponentFixture<IntegrationsListComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [IntegrationsListComponent],
		})
		fixture = TestBed.createComponent(IntegrationsListComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
