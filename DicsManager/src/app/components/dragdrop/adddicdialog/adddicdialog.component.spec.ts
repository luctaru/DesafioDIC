import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddicdialogComponent } from './adddicdialog.component';

describe('AdddicdialogComponent', () => {
  let component: AdddicdialogComponent;
  let fixture: ComponentFixture<AdddicdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddicdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddicdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
