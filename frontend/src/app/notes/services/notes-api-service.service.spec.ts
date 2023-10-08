import { TestBed } from '@angular/core/testing';

import { NotesApiServiceService } from './notes-api-service.service';

describe('NotesApiServiceService', () => {
  let service: NotesApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
