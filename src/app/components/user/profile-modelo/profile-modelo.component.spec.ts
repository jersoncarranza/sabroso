import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModeloComponent } from './profile-modelo.component';

describe('ProfileModeloComponent', () => {
  let component: ProfileModeloComponent;
  let fixture: ComponentFixture<ProfileModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
