import { TestBed } from '@angular/core/testing';

import { PerioddialogService } from './perioddialog.service';

describe('PerioddialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PerioddialogService = TestBed.get(PerioddialogService);
    expect(service).toBeTruthy();
  });
});
