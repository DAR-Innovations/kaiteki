import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UpdateChatDialogComponent } from './update-chat-dialog.component'

describe('UpdateChatDialogComponent', () => {
	let component: UpdateChatDialogComponent
	let fixture: ComponentFixture<UpdateChatDialogComponent>

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [UpdateChatDialogComponent],
		})
		fixture = TestBed.createComponent(UpdateChatDialogComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
