import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserdialogComponent } from './adduserdialog.component';

describe('AdduserdialogComponent', () => {
  let component: AdduserdialogComponent;
  let fixture: ComponentFixture<AdduserdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
