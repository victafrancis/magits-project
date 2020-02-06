import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollStudentComponent } from './enroll-student.component';

describe('EnrollStudentComponent', () => {
  let component: EnrollStudentComponent;
  let fixture: ComponentFixture<EnrollStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
