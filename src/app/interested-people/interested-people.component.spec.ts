import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedPeopleComponent } from './interested-people.component';

describe('InterestedPeopleComponent', () => {
  let component: InterestedPeopleComponent;
  let fixture: ComponentFixture<InterestedPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
