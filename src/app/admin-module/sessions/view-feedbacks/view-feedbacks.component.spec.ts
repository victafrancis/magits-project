import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedbacksComponent } from './view-feedbacks.component';

describe('ViewFeedbacksComponent', () => {
  let component: ViewFeedbacksComponent;
  let fixture: ComponentFixture<ViewFeedbacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFeedbacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
