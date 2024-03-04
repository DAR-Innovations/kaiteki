import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SpotifyDashboardComponent } from './spotify-dashboard.component'

describe('SpotifyDashboardComponent', () => {
	let component: SpotifyDashboardComponent
	let fixture: ComponentFixture<SpotifyDashboardComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SpotifyDashboardComponent],
		})
		fixture = TestBed.createComponent(SpotifyDashboardComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
