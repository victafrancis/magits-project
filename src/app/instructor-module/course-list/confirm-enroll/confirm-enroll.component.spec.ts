import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEnrollComponent } from './confirm-enroll.component';

describe('ConfirmEnrollComponent', () => {
  let component: ConfirmEnrollComponent;
  let fixture: ComponentFixture<ConfirmEnrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEnrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
