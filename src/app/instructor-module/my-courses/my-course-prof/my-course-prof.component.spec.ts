import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseProfComponent } from './my-course-prof.component';

describe('MyCourseProfComponent', () => {
  let component: MyCourseProfComponent;
  let fixture: ComponentFixture<MyCourseProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCourseProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCourseProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
