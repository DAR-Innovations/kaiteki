import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FilesListItemComponent } from './files-list-item.component'

describe('FilesListItemComponent', () => {
	let component: FilesListItemComponent
	let fixture: ComponentFixture<FilesListItemComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FilesListItemComponent],
		})
		fixture = TestBed.createComponent(FilesListItemComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
