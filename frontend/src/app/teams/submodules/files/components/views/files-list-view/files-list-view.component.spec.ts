import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilesListViewComponent } from './files-list-view.component'

describe('FilesListViewComponent', () => {
	let component: FilesListViewComponent
	let fixture: ComponentFixture<FilesListViewComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FilesListViewComponent],
		})
		fixture = TestBed.createComponent(FilesListViewComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
