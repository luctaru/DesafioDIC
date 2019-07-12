import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicdialogComponent } from './dicdialog.component';

describe('DicdialogComponent', () => {
  let component: DicdialogComponent;
  let fixture: ComponentFixture<DicdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
