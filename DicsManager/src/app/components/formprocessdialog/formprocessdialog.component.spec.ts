import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormprocessdialogComponent } from './formprocessdialog.component';

describe('FormprocessdialogComponent', () => {
  let component: FormprocessdialogComponent;
  let fixture: ComponentFixture<FormprocessdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormprocessdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormprocessdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
