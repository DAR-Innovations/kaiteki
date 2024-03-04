import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostsFavouriteComponent } from './posts-favourite.component'

describe('PostsFavouriteComponent', () => {
	let component: PostsFavouriteComponent
	let fixture: ComponentFixture<PostsFavouriteComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PostsFavouriteComponent],
		})
		fixture = TestBed.createComponent(PostsFavouriteComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
