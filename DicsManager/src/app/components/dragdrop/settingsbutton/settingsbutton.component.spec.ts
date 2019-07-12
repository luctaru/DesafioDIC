import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsbuttonComponent } from './settingsbutton.component';

describe('SettingsbuttonComponent', () => {
  let component: SettingsbuttonComponent;
  let fixture: ComponentFixture<SettingsbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
