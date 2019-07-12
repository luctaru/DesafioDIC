import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationdialogComponent } from './operationdialog.component';

describe('OperationdialogComponent', () => {
  let component: OperationdialogComponent;
  let fixture: ComponentFixture<OperationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
