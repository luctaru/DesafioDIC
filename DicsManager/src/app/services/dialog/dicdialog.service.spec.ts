import { TestBed } from '@angular/core/testing';

import { DicdialogService } from './dicdialog.service';

describe('DicdialogserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DicdialogService = TestBed.get(DicdialogService);
    expect(service).toBeTruthy();
  });
});
