import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsToolbarComponent } from './posts-toolbar.component';

describe('PostsToolbarComponent', () => {
  let component: PostsToolbarComponent;
  let fixture: ComponentFixture<PostsToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsToolbarComponent]
    });
    fixture = TestBed.createComponent(PostsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
