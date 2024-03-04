import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DashboardPlaylistItemComponent } from './dashboard-playlist-item.component'

describe('DashboardPlaylistItemComponent', () => {
	let component: DashboardPlaylistItemComponent
	let fixture: ComponentFixture<DashboardPlaylistItemComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DashboardPlaylistItemComponent],
		})
		fixture = TestBed.createComponent(DashboardPlaylistItemComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
