import { TestBed } from '@angular/core/testing';

import { DicsService } from './dics.service';

describe('DicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DicsService = TestBed.get(DicsService);
    expect(service).toBeTruthy();
  });
});
