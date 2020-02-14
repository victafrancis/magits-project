import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSessionsComponent } from './course-sessions.component';

describe('CourseSessionsComponent', () => {
  let component: CourseSessionsComponent;
  let fixture: ComponentFixture<CourseSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
