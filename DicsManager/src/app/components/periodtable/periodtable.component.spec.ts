import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodtableComponent } from './periodtable.component';

describe('PeriodtableComponent', () => {
  let component: PeriodtableComponent;
  let fixture: ComponentFixture<PeriodtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
