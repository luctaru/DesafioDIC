import { TestBed } from '@angular/core/testing';

import { DepartmentdialogService } from './departmentdialog.service';

describe('DepartmentdialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentdialogService = TestBed.get(DepartmentdialogService);
    expect(service).toBeTruthy();
  });
});
