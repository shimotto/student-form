import { TestBed } from '@angular/core/testing';

import { AndrewService } from './andrew.service';

describe('AndrewService', () => {
  let service: AndrewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AndrewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
