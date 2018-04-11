import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DormPageConsComponent } from './dorm-page-cons.component';

describe('DormPageConsComponent', () => {
  let component: DormPageConsComponent;
  let fixture: ComponentFixture<DormPageConsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DormPageConsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DormPageConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
