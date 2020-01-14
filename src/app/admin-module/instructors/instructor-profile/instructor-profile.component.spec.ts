import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorProfileComponent } from './instructor-profile.component';

describe('InstructorProfileComponent', () => {
  let component: InstructorProfileComponent;
  let fixture: ComponentFixture<InstructorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
