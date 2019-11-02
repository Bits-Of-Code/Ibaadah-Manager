import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromstartPage } from './fromstart.page';

describe('FromstartPage', () => {
  let component: FromstartPage;
  let fixture: ComponentFixture<FromstartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromstartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromstartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
