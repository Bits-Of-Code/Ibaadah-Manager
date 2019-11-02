import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WklyPrayerEvalPage } from './wkly-prayer-eval.page';

describe('WklyPrayerEvalPage', () => {
  let component: WklyPrayerEvalPage;
  let fixture: ComponentFixture<WklyPrayerEvalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WklyPrayerEvalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WklyPrayerEvalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
