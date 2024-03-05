import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PostsListViewComponent } from './posts-list-view.component'

describe('PostsListViewComponent', () => {
	let component: PostsListViewComponent
	let fixture: ComponentFixture<PostsListViewComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PostsListViewComponent],
		})
		fixture = TestBed.createComponent(PostsListViewComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
