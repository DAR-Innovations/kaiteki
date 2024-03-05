import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilesFilterComponent } from './files-filter.component'

describe('FilesFilterComponent', () => {
	let component: FilesFilterComponent
	let fixture: ComponentFixture<FilesFilterComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FilesFilterComponent],
		})
		fixture = TestBed.createComponent(FilesFilterComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
