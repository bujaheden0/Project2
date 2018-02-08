import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestValidateComponent } from './test-validate.component';

describe('TestValidateComponent', () => {
  let component: TestValidateComponent;
  let fixture: ComponentFixture<TestValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
