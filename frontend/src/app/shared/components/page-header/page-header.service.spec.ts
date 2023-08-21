import { TestBed } from '@angular/core/testing';

import { PageHeaderService } from './page-header.service';

describe('PageHeaderService', () => {
  let service: PageHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
