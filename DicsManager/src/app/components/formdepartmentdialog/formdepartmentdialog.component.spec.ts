import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdepartmentdialogComponent } from './formdepartmentdialog.component';

describe('FormdepartmentdialogComponent', () => {
  let component: FormdepartmentdialogComponent;
  let fixture: ComponentFixture<FormdepartmentdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdepartmentdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdepartmentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
