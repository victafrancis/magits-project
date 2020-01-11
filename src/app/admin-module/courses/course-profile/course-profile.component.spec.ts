import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProfileComponent } from './course-profile.component';

describe('CourseProfileComponent', () => {
  let component: CourseProfileComponent;
  let fixture: ComponentFixture<CourseProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
