import { TestBed } from '@angular/core/testing';

import { ApiNotizService } from './api-notiz.service';

describe('ApiNotizService', () => {
  let service: ApiNotizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNotizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
