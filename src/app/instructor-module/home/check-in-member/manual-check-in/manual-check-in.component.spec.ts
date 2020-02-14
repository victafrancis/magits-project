import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualCheckInComponent } from './manual-check-in.component';

describe('ManualCheckInComponent', () => {
  let component: ManualCheckInComponent;
  let fixture: ComponentFixture<ManualCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
