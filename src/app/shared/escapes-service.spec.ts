import { TestBed } from '@angular/core/testing';

import { EscapesService } from './escapes-service';

describe('EscapesService', () => {
  let service: EscapesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscapesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
