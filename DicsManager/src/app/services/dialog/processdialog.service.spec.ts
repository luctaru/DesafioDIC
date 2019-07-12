import { TestBed } from '@angular/core/testing';

import { ProcessdialogService } from './processdialog.service';

describe('ProcessdialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessdialogService = TestBed.get(ProcessdialogService);
    expect(service).toBeTruthy();
  });
});
