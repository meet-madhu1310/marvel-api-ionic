import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsListPage } from './comics-list.page';

describe('ComicsListPage', () => {
  let component: ComicsListPage;
  let fixture: ComponentFixture<ComicsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
