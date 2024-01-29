import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPlayerComponent } from './spotify-player.component';

describe('SpotifyPlayerComponent', () => {
  let component: SpotifyPlayerComponent;
  let fixture: ComponentFixture<SpotifyPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyPlayerComponent]
    });
    fixture = TestBed.createComponent(SpotifyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
