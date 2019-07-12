import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormperioddialogComponent } from './formperioddialog.component';

describe('FormperioddialogComponent', () => {
  let component: FormperioddialogComponent;
  let fixture: ComponentFixture<FormperioddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormperioddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormperioddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
