import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmodeloComponent } from './modalmodelo.component';

describe('ModalmodeloComponent', () => {
  let component: ModalmodeloComponent;
  let fixture: ComponentFixture<ModalmodeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmodeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmodeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
