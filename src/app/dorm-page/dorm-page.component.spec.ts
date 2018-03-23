import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DormPageComponent } from './dorm-page.component';

describe('DormPageComponent', () => {
  let component: DormPageComponent;
  let fixture: ComponentFixture<DormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
