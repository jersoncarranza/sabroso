import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHijoComponent } from './main-hijo.component';

describe('MainHijoComponent', () => {
  let component: MainHijoComponent;
  let fixture: ComponentFixture<MainHijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
