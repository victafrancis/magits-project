import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInMemberComponent } from './check-in-member.component';

describe('CheckInMemberComponent', () => {
  let component: CheckInMemberComponent;
  let fixture: ComponentFixture<CheckInMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
