import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchedComponent } from './user-matched.component';

describe('UserMatchedComponent', () => {
  let component: UserMatchedComponent;
  let fixture: ComponentFixture<UserMatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
